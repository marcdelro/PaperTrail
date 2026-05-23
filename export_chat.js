import fs from 'fs';

const logPath = "C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\7a982b50-c952-4b53-9be5-3ea6e774da48\\.system_generated\\logs\\transcript.jsonl";
const outPath = "d:\\Hackathon\\PaperTrail\\conversation_history.md";

try {
  const data = fs.readFileSync(logPath, 'utf8');
  const lines = data.split('\n').filter(Boolean);

  let markdown = '# PaperTrail: Development Conversation History\n\n';

  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (entry.source === 'USER_EXPLICIT' && entry.type === 'USER_INPUT') {
          // Extract just the user request, ignore the metadata injected by the IDE
          let content = entry.content;
          const match = content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
          if (match) {
              content = match[1].trim();
          } else {
              content = content.split('<ADDITIONAL_METADATA>')[0].trim();
          }
          if (content) {
             markdown += `### User\n*${entry.created_at}*\n\n${content}\n\n---\n\n`;
          }
      } else if (entry.source === 'MODEL' && entry.type === 'PLANNER_RESPONSE' && entry.content) {
          markdown += `### AI\n*${entry.created_at}*\n\n${entry.content}\n\n---\n\n`;
      }
    } catch(e) {
      // Ignore parse errors on bad lines
    }
  }

  fs.writeFileSync(outPath, markdown);
  console.log("Successfully exported to " + outPath);
} catch(err) {
  console.error("Failed to parse logs:", err);
}
