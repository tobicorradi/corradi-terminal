import { useRef } from 'react';
import { AsciiOrb, InfoCard, NavBar } from './components';
import { siteContent } from './content/site-content';
import { usePinnedNav } from './hooks';
import styles from './App.module.css';

export const App = () => {
  const {
    availability,
    aboutNote,
    cards,
    contact,
    heading,
    location,
    name,
    navigation,
    socialLinks,
    stackGroups,
    workTimeline,
  } = siteContent;
  const heroRef = useRef<HTMLElement>(null);
  const isPinnedNav = usePinnedNav(heroRef, 104);
  const isExternalContactLink = /^https?:\/\//.test(contact.link.href);
  const titleParts = heading.title.trim().split(/\s+/);
  const trailingTitlePart = titleParts.at(-1) ?? heading.title;
  const leadingTitleParts = titleParts.slice(0, -1);

  return (
    <div className={styles.shell} id="top">
      <div className={styles.frame}>
        <NavBar githubLink={socialLinks.github} isPinned={false} items={navigation} name={name} />
        {isPinnedNav ? (
          <NavBar githubLink={socialLinks.github} isPinned items={navigation} name={name} />
        ) : null}

        <main className={styles.main}>
          <section className={styles.hero} aria-labelledby="hero-title" ref={heroRef}>
            <div className={styles.heroCopy}>
              <div className={styles.kickerRow}>
                <p className={styles.kicker}>{heading.kicker}</p>
                <span className={styles.dataStrip} aria-hidden="true" />
              </div>

              <h1 aria-label={heading.title} className={styles.title} id="hero-title">
                <span className={styles.titleText}>
                  {leadingTitleParts.map((part) => (
                    <span className={styles.titleWord} key={part}>
                      {part}
                    </span>
                  ))}
                  <span className={`${styles.titleWord} ${styles.titleWordTrailing}`.trim()}>
                    {trailingTitlePart}
                  </span>
                </span>
              </h1>

              <p className={styles.techLine}>{heading.technologies.join(' • ')}</p>
              <p className={styles.summary}>{heading.summary}</p>

              <div className={styles.ctaRow}>
                <a className={styles.terminalButton} href="#about">
                  [ ABOUT ]
                </a>
                <a className={styles.terminalButton} href="#work">
                  [ WORK ]
                </a>
                <a className={styles.terminalButton} href="#contact">
                  [ CONTACT ]
                </a>
                <a
                  className={styles.terminalButton}
                  href={socialLinks.github.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  [ GITHUB ]
                </a>
              </div>
            </div>

            <div className={styles.orbRail}>
              <span className={styles.verticalRule} aria-hidden="true" />
              <AsciiOrb />
            </div>
          </section>

          <section className={styles.cardGrid} aria-label="Highlights">
            {cards.map((card) => (
              <InfoCard
                key={card.title}
                description={card.description}
                icon={card.icon}
                lines={card.lines}
                title={card.title}
              />
            ))}
          </section>

          <section className={styles.sectionPanel} id="about" aria-labelledby="about-title">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>_01</span>
              <h2 className={styles.sectionTitle} id="about-title">
                About
              </h2>
              <span className={styles.sectionRule} aria-hidden="true" />
            </div>

            <div className={styles.aboutGrid}>
              <div className={styles.copyStack}>
                {siteContent.about.map((paragraph) => (
                  <p className={styles.bodyCopy} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <aside className={styles.terminalNote}>
                <p className={styles.noteLabel}>// SIGNAL</p>
                <p className={styles.noteCopy}>{aboutNote}</p>
              </aside>
            </div>
          </section>

          <section className={styles.sectionPanel} id="work" aria-labelledby="work-title">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>_02</span>
              <h2 className={styles.sectionTitle} id="work-title">
                Work
              </h2>
              <span className={styles.sectionRule} aria-hidden="true" />
            </div>

            <div className={styles.timelineGrid}>
              {workTimeline.map((item) => (
                <article className={styles.timelineCard} key={item.title}>
                  <p className={styles.timelineMeta}>
                    <span>{item.period}</span>
                    <span>{item.category}</span>
                  </p>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineCompany}>{item.company}</p>
                  <p className={styles.bodyCopy}>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.sectionPanel} id="stack" aria-labelledby="stack-title">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>_03</span>
              <h2 className={styles.sectionTitle} id="stack-title">
                Stack
              </h2>
              <span className={styles.sectionRule} aria-hidden="true" />
            </div>

            <div className={styles.stackGrid}>
              {stackGroups.map((group) => (
                <article className={styles.stackCard} key={group.title}>
                  <p className={styles.noteLabel}>{group.label}</p>
                  <h3 className={styles.stackTitle}>{group.title}</h3>
                  <div className={styles.tagCloud}>
                    {group.items.map((item) => (
                      <span className={styles.tag} key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.sectionPanel} id="contact" aria-labelledby="contact-title">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>_04</span>
              <h2 className={styles.sectionTitle} id="contact-title">
                Contact
              </h2>
              <span className={styles.sectionRule} aria-hidden="true" />
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.copyStack}>
                <p className={styles.bodyCopy}>{contact.message}</p>
                <p className={styles.bodyCopy}>{contact.secondaryMessage}</p>

                <div className={styles.contactRow}>
                  {contact.topics.map((topic) => (
                    <span className={styles.topicPill} key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <aside className={styles.contactPanel}>
                <p className={styles.noteLabel}>// STATUS</p>
                <p className={styles.contactStatus}>{availability}</p>
                <p className={styles.contactLocation}>{location}</p>
                <a
                  className={styles.contactAction}
                  href={contact.link.href}
                  rel={isExternalContactLink ? 'noreferrer' : undefined}
                  target={isExternalContactLink ? '_blank' : undefined}
                >
                  {contact.link.label}
                </a>
              </aside>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerStatus}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>{availability}</span>
          </div>

          <div className={styles.footerLocation}>
            <span>{location}</span>
            <span className={styles.footerMark} aria-hidden="true">
              ///////
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
