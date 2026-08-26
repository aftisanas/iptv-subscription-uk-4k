type Props = {
  className?: string;
};

/**
 * The site's emblem. A raster mark rather than inline SVG, because that is the
 * artwork we were given — served at 512 and drawn at 30–42px, so it stays crisp
 * on a 2x display without a second file.
 *
 * Decorative in every place it appears: the wordmark or the link's aria-label
 * already carries the name, so a second announcement would be noise.
 */
export default function BrandMark({ className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src="/logo.webp"
      alt=""
      width={512}
      height={512}
      aria-hidden="true"
      decoding="async"
    />
  );
}
