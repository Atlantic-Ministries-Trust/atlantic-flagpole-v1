'use client'

import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

interface MarkdownProps {
    content: string
    components?: Components
}

export function Markdown({ content, components }: MarkdownProps) {
    return (
        <ReactMarkdown components={components}>
            {content}
        </ReactMarkdown>
    )
}
