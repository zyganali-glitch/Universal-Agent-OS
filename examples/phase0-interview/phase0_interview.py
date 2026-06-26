"""
Universal Agent OS — Phase-0 Interview Script

This is a platform-agnostic reference implementation of the Phase-0 consultation
interview. It can be used as-is or adapted for any platform integration.

Usage:
    python phase0_interview.py start
    python phase0_interview.py answer --value "user's answer"
    python phase0_interview.py status

The interview persists state to a JSON file so it survives session restarts.
"""
import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


ARTIFACT_DIR = Path("run_artifacts")
PHASE0_STATE_PATH = ARTIFACT_DIR / "phase0_contract.json"

# The Phase-0 questions are intentionally platform-agnostic.
# Each question captures a governance decision, not a technical preference.
# Agents should present these in the user's language.
QUESTIONS = [
    {
        "id": "project_idea",
        "question_en": "What do you want to build? Describe your idea in one or two everyday sentences.",
        "question_tr": "Ne yapmak istiyorsun? Fikrini gunluk dille bir veya iki cumleyle anlat.",
        "example": "Example: A simple system to match lost pets with their owners in the neighborhood.",
        "default": "If you are not sure yet, just describe the problem you want to solve.",
    },
    {
        "id": "target_users",
        "question_en": "Who will use this the most?",
        "question_tr": "Bunu en cok kim kullanacak?",
        "example": "Example: small business owners, students, or only company employees.",
        "default": "If unsure, I recommend starting with one clear user group for the first version.",
    },
    {
        "id": "usage_place",
        "question_en": "Where should people use this most comfortably?",
        "question_tr": "Insanlar bunu en rahat nerede kullanmali?",
        "example": "Website, phone app, desktop program, or 'I'm not sure'.",
        "default": "If unsure, I recommend starting with a website since it requires no installation.",
    },
    {
        "id": "accounts_and_privacy",
        "question_en": "Do users need to create accounts or store private information?",
        "question_tr": "Kullanicilarin hesap acmasi veya ozel bilgi saklamasi gerekiyor mu?",
        "example": "Example: email login, address, payment info; or none of these.",
        "default": "If not needed, I recommend starting without accounts or private data collection.",
    },
    {
        "id": "business_model",
        "question_en": "Will this project be free, earn money, or have you not decided yet?",
        "question_tr": "Bu proje ucretsiz mi olacak, para kazandiracak mi, yoksa simdilik karar vermedin mi?",
        "example": "Example: completely free, monthly subscription, B2B sales, or not sure.",
        "default": "If unsure, I recommend validating the first working version for free.",
    },
    {
        "id": "language",
        "question_en": "What language will the first version be used in?",
        "question_tr": "Ilk surum hangi dilde kullanilacak?",
        "example": "Turkish only, English only, or multiple languages.",
        "default": "If your first users are local, I recommend starting with one language.",
    },
    {
        "id": "visual_style",
        "question_en": "How should the project feel to users?",
        "question_tr": "Proje kullaniciya nasil hissettirmeli?",
        "example": "Clean and trustworthy, fun and colorful, serious and corporate, or not sure.",
        "default": "If unsure, I recommend a clean and trustworthy look.",
    },
    {
        "id": "first_success",
        "question_en": "In the first working version, what single task should a user complete successfully for you to say 'this project works'?",
        "question_tr": "Ilk calisan surumde kullanici hangi tek isi basarabilirse 'bu proje calisiyor' dersin?",
        "example": "Example: create a listing, book an appointment, or download a report.",
        "default": "I recommend a small first version that completes one main task flawlessly.",
    },
]


class Phase0Error(RuntimeError):
    pass


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, payload):
    ARTIFACT_DIR.mkdir(exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")


def question_payload(index: int):
    question = QUESTIONS[index]
    return {
        "phase0_status": "IN_PROGRESS",
        "question_number": index + 1,
        "total_questions": len(QUESTIONS),
        **question,
    }


def start():
    if PHASE0_STATE_PATH.exists():
        state = load_json(PHASE0_STATE_PATH)
        if state.get("status") == "PHASE0_COMPLETE":
            return {
                "phase0_status": "PHASE0_COMPLETE",
                "answers": state["answers"],
                "message": "Phase-0 is already complete.",
            }
        return question_payload(state["current_question_index"])

    state = {
        "status": "IN_PROGRESS",
        "started_at": datetime.now(timezone.utc).isoformat(),
        "current_question_index": 0,
        "answers": {},
    }
    save_json(PHASE0_STATE_PATH, state)
    return question_payload(0)


def answer(value: str):
    if not value.strip():
        raise Phase0Error("The answer cannot be empty.")
    if not PHASE0_STATE_PATH.exists():
        raise Phase0Error("Phase-0 has not started.")

    state = load_json(PHASE0_STATE_PATH)
    if state.get("status") == "PHASE0_COMPLETE":
        raise Phase0Error("Phase-0 is already complete.")

    index = state["current_question_index"]
    question = QUESTIONS[index]
    state["answers"][question["id"]] = value.strip()
    next_index = index + 1

    if next_index >= len(QUESTIONS):
        state.update(
            {
                "status": "PHASE0_COMPLETE",
                "current_question_index": next_index,
                "completed_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        save_json(PHASE0_STATE_PATH, state)
        return {
            "phase0_status": "PHASE0_COMPLETE",
            "answers": state["answers"],
            "message": (
                "Phase-0 contract is complete. Summarize the decisions and create "
                "the implementation plan before writing product code."
            ),
        }

    state["current_question_index"] = next_index
    save_json(PHASE0_STATE_PATH, state)
    return question_payload(next_index)


def status():
    if not PHASE0_STATE_PATH.exists():
        return {"phase0_status": "NOT_STARTED"}
    return load_json(PHASE0_STATE_PATH)


def parse_args():
    parser = argparse.ArgumentParser(description="Universal Agent OS Phase-0 interview")
    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("start")
    answer_parser = subparsers.add_parser("answer")
    answer_parser.add_argument("--value", required=True)
    subparsers.add_parser("status")
    return parser.parse_args()


def main():
    args = parse_args()
    try:
        if args.command == "start":
            result = start()
        elif args.command == "answer":
            result = answer(args.value)
        else:
            result = status()
        print(json.dumps(result, indent=2, ensure_ascii=False))
    except Phase0Error as exc:
        print(
            json.dumps(
                {"success": False, "error": str(exc)},
                indent=2,
                ensure_ascii=False,
            )
        )
        raise SystemExit(1)


if __name__ == "__main__":
    main()
