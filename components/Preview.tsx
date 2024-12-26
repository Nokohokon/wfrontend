import React from 'react'
import { DiscordMessage } from '@/types/discord'
import { useLanguage } from '@/contexts/LanguageContext'

type PreviewProps = {
  message: DiscordMessage
}

export const Preview: React.FC<PreviewProps> = ({ message }) => {
  const { t } = useLanguage()

  return (
    <div className="border rounded-lg p-4 bg-accent">
      <h2 className="text-lg font-semibold mb-2">{t('embed.preview')}</h2>
      <div className="bg-card p-4 rounded-lg space-y-4 text-sm">
        {message.content && <p className="whitespace-pre-wrap text-sm">{message.content}</p>}
        {message.embeds.map((embed, embedIndex) => (
          <div key={embedIndex} className="border-l-4 rounded p-3 bg-background" style={{ borderColor: embed.color }}>
            <div className="flex items-start space-x-2 mb-2">
              {embed.authorIconUrl && (
                <img src={embed.authorIconUrl} alt="" className="w-6 h-6 rounded-full" />
              )}
              <div className="flex-grow">
                {embed.authorName && (
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-xs">{embed.authorName}</span>
                  </div>
                )}
                {embed.title && (
                  <h3 className="text-sm font-bold">
                    {embed.titleUrl ? (
                      <a href={embed.titleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {embed.title}
                      </a>
                    ) : (
                      embed.title
                    )}
                  </h3>
                )}
              </div>
              {embed.thumbnail && (
                <img src={embed.thumbnail} alt="Thumbnail" className="w-12 h-12 rounded object-cover" />
              )}
            </div>
            {embed.description && <p className="mt-1 text-xs whitespace-pre-wrap">{embed.description}</p>}
            {embed.fields.length > 0 && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {embed.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className={field.inline ? 'col-span-1' : 'col-span-full'}>
                    <h4 className="font-semibold text-xs">{field.name}</h4>
                    <p className="text-xs">{field.value}</p>
                  </div>
                ))}
              </div>
            )}
            {embed.image && (
              <img src={embed.image} alt="Image" className="mt-2 max-w-full h-auto rounded" style={{ maxHeight: '200px' }} />
            )}
            {embed.footer && (
              <div className="mt-2 flex items-center space-x-2 text-xs text-muted-foreground">
                {embed.footerIconUrl && (
                  <img src={embed.footerIconUrl} alt="" className="w-4 h-4 rounded-full" />
                )}
                <span>{embed.footer}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

