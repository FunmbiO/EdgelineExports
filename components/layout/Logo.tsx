import Image from "next/image";

const SOURCES = {
  // White text/icon — for dark surfaces (nav, footer, admin).
  dark: "/logo-dark-bg.png",
  // Original black text/icon — for light surfaces (email templates, print).
  light: "/logo.png",
};

interface LogoProps {
  variant?: keyof typeof SOURCES;
  className?: string;
  priority?: boolean;
}

export default function Logo({ variant = "dark", className = "h-9 w-auto", priority }: LogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt="Edgeline Exports"
      width={706}
      height={376}
      priority={priority}
      className={className}
    />
  );
}
