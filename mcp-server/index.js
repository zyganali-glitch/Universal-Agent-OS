const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const fs = require("fs").promises;
const path = require("path");

const MEMORY_FILE = path.join(__dirname, '..', 'agent_memory.json');

const server = new Server(
  {
    name: "agent-os-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function readMemory() {
  const data = await fs.readFile(MEMORY_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeMemory(data) {
  await fs.writeFile(MEMORY_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "agent_os_read_memory",
        description: "Reads agent_memory.json from the parent directory",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "agent_os_log_lesson",
        description: "Appends a string to collective_lessons array in agent_memory.json",
        inputSchema: {
          type: "object",
          properties: {
            lesson: {
              type: "string",
              description: "The lesson to log",
            },
          },
          required: ["lesson"],
        },
      },
      {
        name: "agent_os_report_debt",
        description: "Appends a string to technical_debt array in agent_memory.json",
        inputSchema: {
          type: "object",
          properties: {
            debt: {
              type: "string",
              description: "The technical debt to report",
            },
          },
          required: ["debt"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "agent_os_read_memory") {
      const data = await readMemory();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }

    if (request.params.name === "agent_os_log_lesson") {
      const lesson = request.params.arguments.lesson;
      const data = await readMemory();
      data.collective_lessons.push(lesson);
      await writeMemory(data);
      return {
        content: [
          {
            type: "text",
            text: `Lesson logged successfully: ${lesson}`,
          },
        ],
      };
    }

    if (request.params.name === "agent_os_report_debt") {
      const debt = request.params.arguments.debt;
      const data = await readMemory();
      data.technical_debt.push(debt);
      await writeMemory(data);
      return {
        content: [
          {
            type: "text",
            text: `Technical debt reported successfully: ${debt}`,
          },
        ],
      };
    }

    throw new Error(`Tool not found: ${request.params.name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Agent OS MCP Server running on stdio");
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
}

main();
