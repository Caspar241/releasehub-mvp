import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-inverse section-spacing">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Produkt */}
          <div>
            <h4 className="font-semibold mb-4">Produkt</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-text-secondary hover:text-text-inverse transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#faq" className="text-text-secondary hover:text-text-inverse transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@releasehub.com" className="text-text-secondary hover:text-text-inverse transition-colors">
                  support@releasehub.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-inverse transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-inverse transition-colors">
                  Twitter/X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-dark text-center text-text-secondary">
          <p>© 2025 ReleaseHub – Artist Operating System</p>
          <p className="mt-2">Made in Europe. 0% Rights Taken.</p>
        </div>
      </div>
    </footer>
  );
}
