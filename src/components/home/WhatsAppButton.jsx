export default function WhatsAppButton() {
  return (
    <a
      aria-label="Chat with ColorEyes on WhatsApp"
      className="fixed right-3 bottom-3 z-[100] block size-20 transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00BD00] max-[640px]:right-2 max-[640px]:bottom-2"
      href="https://wa.me/919876543210"
      rel="noreferrer"
      target="_blank"
    >
      <img alt="" className="size-full" src="/assets/wp-icon.svg" />
    </a>
  );
}
