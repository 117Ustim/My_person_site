export const portfolioBlurDataUrl = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23262a2e'/%3E%3C/svg%3E"
export const projectDetailsCloseDuration = 460

export function splitReadableParagraphs(text: string) {
  const explicitParagraphs = text
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  if (explicitParagraphs.length > 1) {
    return explicitParagraphs
  }

  const sentences = text.match(/[^.!?…]+(?:[.!?…]+|$)/g)?.map(sentence => sentence.trim()).filter(Boolean) ?? [text.trim()]

  if (sentences.length <= 1) {
    const clauses = text
      .split(/(?<=[,:;])\s+/)
      .map(clause => clause.trim())
      .filter(Boolean)

    return clauses.length > 1 && text.length > 180 ? clauses : [text.trim()]
  }

  const paragraphs: string[] = []
  let currentParagraph = ''

  sentences.forEach(sentence => {
    const nextParagraph = currentParagraph ? `${currentParagraph} ${sentence}` : sentence

    if (currentParagraph && nextParagraph.length > 230) {
      paragraphs.push(currentParagraph)
      currentParagraph = sentence
      return
    }

    currentParagraph = nextParagraph
  })

  if (currentParagraph) {
    paragraphs.push(currentParagraph)
  }

  return paragraphs
}
