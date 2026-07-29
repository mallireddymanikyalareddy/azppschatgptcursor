"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { HomepageNewsletter } from "@/features/homepage/types";

export function NewsletterSection({
  newsletter,
}: {
  newsletter: HomepageNewsletter;
}) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section
      id="newsletter"
      className="scroll-mt-24 py-12 md:py-16"
      aria-labelledby="newsletter-heading"
    >
      <div className="container">
        <div className="border-border/80 bg-card/40 mx-auto max-w-3xl rounded-xl border px-6 py-8 md:px-10">
          <h2
            id="newsletter-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            {newsletter.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {newsletter.description}
          </p>
          <ul className="text-muted-foreground mt-4 list-inside list-disc text-sm">
            {newsletter.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {submitted ? (
            <p className="text-foreground mt-6 text-sm" role="status">
              Thanks — mock signup recorded locally. No email was sent.
            </p>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) return;
                setSubmitted(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 sm:flex-1"
              />
              <Button type="submit" className="h-11">
                Subscribe
              </Button>
            </form>
          )}
          <p className="text-muted-foreground mt-3 text-xs">
            {newsletter.privacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
