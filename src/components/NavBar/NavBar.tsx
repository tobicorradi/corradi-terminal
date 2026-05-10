import { useEffect, useId, useState } from 'react';
import styles from './NavBar.module.css';

interface NavItem {
  id: string;
  index: string;
  label: string;
}

interface ExternalLink {
  href: string;
  label: string;
}

interface NavBarProps {
  githubLink: ExternalLink;
  isPinned: boolean;
  items: NavItem[];
  name: string;
}

export const NavBar = ({ githubLink, isPinned, items, name }: NavBarProps) => (
  <NavBarContent githubLink={githubLink} isPinned={isPinned} items={items} name={name} />
);

const NavBarContent = ({ githubLink, isPinned, items, name }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 640) {
        setIsMenuOpen(false);
      }
    };

    closeMenuOnDesktop();
    window.addEventListener('resize', closeMenuOnDesktop);

    return () => {
      window.removeEventListener('resize', closeMenuOnDesktop);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${isPinned ? styles.headerPinned : ''} ${
        isMenuOpen ? styles.headerMenuOpen : ''
      }`.trim()}
      data-pinned={isPinned}
    >
      <a className={styles.brand} href="#top" onClick={handleCloseMenu}>
        <span className={styles.mark} aria-hidden="true" />
        <span className={styles.name}>
          {name.toUpperCase()}
          <span className={styles.cursor} aria-hidden="true">
            |
          </span>
        </span>
      </a>

      <button
        aria-controls={navId}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={styles.menuToggle}
        onClick={handleToggleMenu}
        type="button"
      >
        <span className={styles.menuToggleBar} />
        <span className={styles.menuToggleBar} />
        <span className={styles.menuToggleBar} />
      </button>

      <nav aria-label="Primary" className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`.trim()} data-open={isMenuOpen} id={navId}>
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.id}>
              <a className={styles.navLink} href={`#${item.id}`} onClick={handleCloseMenu}>
                <span className={styles.index}>{item.index}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a
          aria-label={githubLink.label}
          className={styles.mobileGithubLink}
          href={githubLink.href}
          onClick={handleCloseMenu}
          rel="noreferrer"
          target="_blank"
        >
          [ GITHUB ]
        </a>
      </nav>

      <a
        aria-label={githubLink.label}
        className={styles.githubLink}
        href={githubLink.href}
        rel="noreferrer"
        target="_blank"
      >
        <svg aria-hidden="true" className={styles.githubIcon} viewBox="0 0 16 16">
          <path
            d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.77.4.08.55-.18.55-.39 0-.19-.01-.83-.01-1.51-2.01.38-2.53-.51-2.69-.97-.09-.24-.48-.97-.82-1.17-.28-.15-.68-.54-.01-.55.63-.01 1.08.6 1.23.85.72 1.24 1.88.89 2.34.68.07-.54.28-.89.51-1.1-1.78-.21-3.64-.92-3.64-4.09 0-.9.31-1.64.82-2.22-.08-.21-.36-1.05.08-2.19 0 0 .67-.22 2.2.85a7.27 7.27 0 0 1 4 0c1.53-1.07 2.2-.85 2.2-.85.44 1.14.16 1.98.08 2.19.51.58.82 1.31.82 2.22 0 3.18-1.87 3.88-3.65 4.09.29.26.54.75.54 1.52 0 1.1-.01 1.98-.01 2.26 0 .21.15.47.55.39A8.21 8.21 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </header>
  );
};
