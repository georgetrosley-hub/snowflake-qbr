export async function streamSseText(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  opts: {
    onText?: (text: string) => void;
    onDone?: () => void;
  } = {}
): Promise<string> {
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  const processEventBlock = (block: string) => {
    // SSE format: data: <payload>\n
    // We only care about `data:` lines.
    const lines = block.split("\n");
    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (!line.startsWith("data:")) continue;

      const data = line.slice("data:".length).trimStart();
      if (!data) continue;

      if (data === "[DONE]") {
        opts.onDone?.();
        return { done: true as const };
      }

      try {
        const parsed = JSON.parse(data) as { text?: string };
        if (parsed.text) {
          fullText += parsed.text;
          opts.onText?.(fullText);
        }
      } catch {
        // Ignore malformed frames.
      }
    }

    return { done: false as const };
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Events are separated by a blank line (`\n\n`).
    while (true) {
      const delimIndex = buffer.indexOf("\n\n");
      if (delimIndex === -1) break;

      const block = buffer.slice(0, delimIndex);
      buffer = buffer.slice(delimIndex + 2);

      const result = processEventBlock(block);
      if (result.done) return fullText;
    }
  }

  // Flush any remaining partial block.
  if (buffer.trim()) {
    processEventBlock(buffer);
  }

  return fullText;
}

