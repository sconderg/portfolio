import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `Privacy policy for ${site.name}'s portfolio.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-accent hover:underline mb-8 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose max-w-none text-muted-foreground space-y-4">
          <p>
            This portfolio site may collect minimal usage data (e.g., via Vercel Analytics) to understand how visitors use the site. No personal data is sold or shared with third parties for marketing.
          </p>
          <p>
            If you contact me via email or a contact form, your message and email address are used only to respond and are not added to mailing lists without your consent.
          </p>
          <p>
            You can disable analytics via your browser or ad-blockers. For questions about this policy, reach out via the contact information on the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
