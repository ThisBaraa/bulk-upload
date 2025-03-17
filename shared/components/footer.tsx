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
        <footer className="w-full dark:bg-slate-900/20 border-t border-border/40 mt-auto backdrop-blur-sm">
            <div className="mx-auto px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Saudi Arabia Railway. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                        <Link
                            className="flex items-center gap-2 transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-105"
                            href="/changelog">
                            <Image
                                aria-hidden
                                src="/file.svg"
                                alt="File icon"
                                width={16}
                                height={16}
                                className="opacity-70"
                            />
                            Changelog
                        </Link>
                        <Link
                            className="flex items-center gap-2 transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-105"
                            href="/help">
                            <Image
                                aria-hidden
                                src="/window.svg"
                                alt="Window icon"
                                width={16}
                                height={16}
                                className="opacity-70"
                            />
                            Help Center
                        </Link>
                        <Link
                            className="flex items-center gap-2 transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-105"
                            href="/report">
                            <Image
                                aria-hidden
                                src="/globe.svg"
                                alt="Globe icon"
                                width={16}
                                height={16}
                                className="opacity-70"
                            />
                            Report a Bug
                        </Link>
                        {version && (
                            <span className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground ml-2 shadow-sm">
                                {version}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
} 