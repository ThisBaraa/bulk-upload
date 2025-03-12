"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Footer() {
    const [version, setVersion] = useState<string | null>(null);

    useEffect(() => {
        setVersion(process.env.VER || "undefined");
    }, []);

    return (
        <footer className="mt-8 border-t border-border/40">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <a
                        className="flex items-center gap-2 transition-colors hover:text-foreground"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            aria-hidden
                            src="/file.svg"
                            alt="File icon"
                            width={16}
                            height={16}
                            className="opacity-70"
                        />
                        Changelog
                    </a>
                    <a
                        className="flex items-center gap-2 transition-colors hover:text-foreground"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            aria-hidden
                            src="/window.svg"
                            alt="Window icon"
                            width={16}
                            height={16}
                            className="opacity-70"
                        />
                        Knowledgebase
                    </a>
                    <a
                        className="flex items-center gap-2 transition-colors hover:text-foreground"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            aria-hidden
                            src="/globe.svg"
                            alt="Globe icon"
                            width={16}
                            height={16}
                            className="opacity-70"
                        />
                        Report a Bug
                    </a>
                    <div className="flex items-center gap-2">
                        {/* <span className="text-muted-foreground">© 2025 SAR Insider. All rights reserved.</span> */}
                        {version && (
                            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                                {version}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
} 