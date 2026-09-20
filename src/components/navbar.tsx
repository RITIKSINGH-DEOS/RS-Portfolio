import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-2 sm:bottom-3 z-50 mx-auto flex justify-center items-center py-2 sm:py-3">
      <Dock className="z-50 pointer-events-auto relative mx-auto flex h-14 items-center px-2 rounded-full bg-background/90 backdrop-blur-xl border border-red-500/40 dark:border-blue-500/40 shadow-[0_0_22px_rgba(220,38,38,0.38),0_0_14px_rgba(37,99,235,0.32),0_4px_16px_rgba(0,0,0,0.09)] dark:shadow-[0_0_26px_rgba(220,38,38,0.55),0_0_18px_rgba(37,99,235,0.5)] hover:shadow-[0_0_32px_rgba(220,38,38,0.7),0_0_22px_rgba(37,99,235,0.6)] hover:border-red-500/60 dark:hover:border-blue-400/60 transition-[background-color,border-color,box-shadow] duration-300">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-10 rounded-full text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 hover:bg-gradient-to-tr hover:from-red-500/15 hover:to-blue-500/15 hover:shadow-[0_0_14px_rgba(220,38,38,0.4)] transition-all duration-200"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="hidden sm:block border border-red-500/30 bg-background text-foreground shadow-[0_4px_16px_rgba(220,38,38,0.25)]">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-2/3 my-auto w-[1.5px] bg-gradient-to-b from-red-500/60 via-blue-500/60 to-red-500/60" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    {...(social.url.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 rounded-full text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 hover:bg-gradient-to-tr hover:from-red-500/15 hover:to-blue-500/15 hover:shadow-[0_0_14px_rgba(220,38,38,0.4)] transition-all duration-200"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="hidden sm:block border border-blue-500/30 bg-background text-foreground shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-2/3 my-auto w-[1.5px] bg-gradient-to-b from-red-500/60 via-blue-500/60 to-red-500/60" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent className="hidden sm:block border border-red-500/30 bg-background text-foreground shadow-[0_4px_16px_rgba(220,38,38,0.25)]">
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
