import { cn } from "@/lib/utils";

export const AnimatedHeading = ({ text, className, as: Comp = "h1" }: { text: string; className?: string; as?: React.ElementType }) => {
  return (
    <Comp className={cn("font-headline", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300 ease-in-out hover:text-primary hover:-translate-y-2"
          style={{ animation: `fadeInUp 0.8s ${index * 0.02}s both` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Comp>
  );
};
