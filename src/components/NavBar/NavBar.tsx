import styles from './NavBar.module.css';

interface NavItem {
  id: string;
  index: string;
  label: string;
}

interface NavBarProps {
  items: NavItem[];
  name: string;
}

export const NavBar = ({ items, name }: NavBarProps) => (
  <header className={styles.header}>
    <a className={styles.brand} href="#top">
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.name}>
        {name.toUpperCase()}
        <span className={styles.cursor} aria-hidden="true">
          _
        </span>
      </span>
    </a>

    <nav aria-label="Primary">
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.id}>
            <a className={styles.navLink} href={`#${item.id}`}>
              <span className={styles.index}>{item.index}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <div className={styles.signal} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </header>
);
