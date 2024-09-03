import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';
import image from '@site/static/img/logo-black-hollow-md.png'

export default function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className={clsx('container', styles.heroContainer)}>
        <img alt='WiX Toolset' className={styles.heroImg} src={image} />
        <h1 className={styles.heroTitle}>
            <Translate id="components.HomepageHeader.heroTitle">{siteConfig.title}</Translate>
        </h1>
        <p className={styles.heroSubtitle}>
            <Translate id="components.HomepageHeader.heroSubtitle">{siteConfig.tagline}</Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="components.HomepageHeader.Get Started">Get Started</Translate> ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}
