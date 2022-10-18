import { ArrowIcon } from "./ArrowIcon";

export interface ICardContent {
  author: string;
  title: string;
  description: string;
  link: string;
}

export function CardContent({
  author,
  title,
  description,
  link,
}: ICardContent) {
  return (
    <section className="flex  p-8">
      <div className="flex flex-col justify-center">
        <span className="font-sm text-sm text-gray-500">{author}</span>
        <h2 className="font-lg text-lg text-orange-200 py-3">{title}</h2>
        <span className="font-sm text-sm text-gray-500">{description}</span>
      </div>
      <div className="flex items-end">
        <a href={link}>
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

CardContent.displayName = "Card.Content";
