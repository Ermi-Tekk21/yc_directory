import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {Author, Slug} from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = {
    _id: string;
    _type: "startup";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string | null; // Allow null to match fetched data
    slug?: Slug | null;   // Change to Slug | null to match fetched data
    author?: Author | null; // Already correct, matches fetched data
    views?: number | null; // Allow null to match fetched data
    description?: string | null; // Allow null to match fetched data
    category?: string | null; // Allow null to match fetched data
    image?: string | null; // Allow null to match fetched data
    pitch?: string; // Optional, not in error message, so keep as is
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const {
        _createdAt,
        views,
        author,
        title,
        category,
        _id,
        image,
        description,
    } = post;

    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">{formatDate(_createdAt)}</p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views ?? 0}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id ?? "#"}`}>
                        <p className="text-16-medium line-clamp-1">{author?.name ?? "Unknown Author"}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title ?? "Untitled"}</h3>
                    </Link>
                </div>
                {author?.image && (
                    <Link href={`/user/${author?._id ?? "#"}`}>
                        <Image
                            src={author.image}
                            alt={author?.name ?? "Author"}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </Link>
                )}
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">{description ?? "No description available"}</p>
                {image && (
                    <img src={image} alt="placeholder" className="startup-card_img" />
                )}
            </Link>

            <div className="flex-between gap-3 mt-5">
                {category && (
                    <Link href={`/?query=${category.toLowerCase()}`}>
                        <p className="text-16-medium">{category}</p>
                    </Link>
                )}
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;