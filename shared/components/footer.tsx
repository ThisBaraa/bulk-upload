"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Footer() {
    const [version, setVersion] = useState<string | null>(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        setVersion(process.env.VER || "undefined");
    }, []);

    return (
        <footer className="w-full dark:bg-slate-900/20 border-t border-border/40 bg-background py-3 md:py-4 sticky bottom-0 z-10">
            <div className="mx-auto px-3 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex items-center">
                        <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                            © {currentYear} Saudi Arabia Railway
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs md:text-sm">
                        <Link
                            className="flex items-center gap-1 md:gap-2 transition-all duration-200 text-muted-foreground hover:text-foreground"
                            href="/changelog">
                            <Image
                                aria-hidden
                                src="/file.svg"
                                alt="File icon"
                                width={14}
                                height={14}
                                className="opacity-70"
                            />
                            <span className="md:inline">Changelog</span>
                        </Link>
                        <Link
                            className="flex items-center gap-1 md:gap-2 transition-all duration-200 text-muted-foreground hover:text-foreground"
                            href="/help">
                            <Image
                                aria-hidden
                                src="/window.svg"
                                alt="Window icon"
                                width={14}
                                height={14}
                                className="opacity-70"
                            />
                            <span className="md:inline">Help</span>
                        </Link>
                        {version && (
                            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] md:text-xs font-medium text-secondary-foreground ml-1 md:ml-2 shadow-sm">
                                {version}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
} 