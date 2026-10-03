import { useEffect, useState } from "react";

// import { getFileUrl } from "../../lib/storage";
import { cn } from "../../lib/utils";

export function useFileUrl(path?: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    setUrl(null);
    // getFileUrl(path).then((next) => {
    //   if (active) setUrl(next);
    // });
    return () => {
      active = false;
    };
  }, [path]);
  return url;
}

export function StoredAvatar({
  path,
  name,
  className,
}: {
  path?: string | null | undefined;
  name?: string | null | undefined;
  className?: string | undefined;
}) {
  const url = useFileUrl(path);
  const initials = (name ?? "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
  console.log(url,"=========")

  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-primary text-xs font-semibold text-primary-foreground",
        className,
      )}
    >
      {url ? (
        <img src={url} alt={name ?? "avatar"} className="size-full object-cover" />
      ) : (
        (initials || "?")
      )}
    </span>
  );
}

export function StoredImage({
  path,
  alt,
  className,
}: {
  path?: string | null | undefined;
  alt: string;
  className?: string | undefined;
}) {
  const url = useFileUrl(path);
  if (!url) return null;
  return <img src={url} alt={alt} className={className} />;
}

export function StoredFileLink({
  path,
  label,
}: {
  path?: string | null | undefined;
  label?: string | undefined;
}) {
  const url = useFileUrl(path);
  if (!path) return null;
  return (
    <a
      href={url ?? undefined}
      target="_blank"
      rel="noreferrer"
      className="text-xs font-medium text-primary underline-offset-2 hover:underline"
    >
      {label ?? "View file"}
    </a>
  );
}
