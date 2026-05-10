import styles from './InfoCard.module.css';

interface InfoCardProps {
  description: string;
  icon: string;
  lines: string[];
  title: string;
}

export const InfoCard = ({ description, icon, lines, title }: InfoCardProps) => (
  <article className={styles.card}>
    <div className={styles.header}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.titleGroup}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.rule} aria-hidden="true" />
      </div>
    </div>

    <p className={styles.description}>{description}</p>

    <div className={styles.copy}>
      {lines.map((line) => (
        <p className={styles.line} key={line}>
          {line}
        </p>
      ))}
    </div>
  </article>
);
