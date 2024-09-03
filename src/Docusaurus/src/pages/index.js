import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Translate from '@docusaurus/Translate';

import styles from './index.module.css';

// HACK: This reaches into the depths of Docusaurus and may break in future updates.
const recentPosts = require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");

function MoreAbout() {
  return (
    <div className="col col--4">
      <h3>
        <Translate id="pages.Home.MoreAbout.title">About the WiX toolset</Translate>
      </h3>
      <p>
        <Translate id="pages.Home.MoreAbout.description">The WiX toolset lets developers create installers for Windows Installer, the Windows installation engine.</Translate>
      </p>
      <ul>
        <li><p><Translate id="pages.Home.MoreAbout.listItem.1">The core of WiX is a set of build tools that build Windows Installer packages using the same build concepts as the rest of your product: source code is compiled and then linked to create executables; in this case .exe setup bundles, .msi installation packages, .msm merge modules, and .msp patches. The WiX command-line build tools work with any automated build system. Also, MSBuild is supported from the command line, Visual Studio, and Team Build.</Translate></p></li>
        <li><p><Translate id="pages.Home.MoreAbout.listItem.2">WiX includes several extensions that offer functionality beyond that of Windows Installer. For example, WiX can install IIS web sites, create SQL Server databases, and register exceptions in the Windows Firewall, among others.</Translate></p></li>
        <li><p><Translate id="pages.Home.MoreAbout.listItem.3">With Burn, the WiX bootstrapper, you can create setup bundles that install prerequisites like the .NET Framework and other runtimes along with your own product. Burn lets you download packages or combine them into a single downloadable .exe.</Translate></p></li>
        <li><p><Translate id="pages.Home.MoreAbout.listItem.4">The WiX SDK includes managed and native libraries that make it easier to write code that works with Windows Installer, including custom actions in both C# and C++.</Translate></p></li>
      </ul>
    </div>
  );
}

function RecentNews() {
  return (
    <div className="col col--4">
      <h3>
        <Translate id="pages.Home.RecentNews.title">Recent news</Translate>
      </h3>
      <p>
        <Translate id="pages.Home.RecentNews.description">The following blogs may have additional news about the progress of the WiX toolset:</Translate>
      </p>
      <ul>
          {recentPosts.items.slice(0, 5).map((item, index) => (
            <h4 key={index}>
              <Link to={item.permalink}>{item.title}</Link>
            </h4>
          ))}
        </ul>
    </div>
  );
}

function OtherNewsSources() {
  return (
    <div className="col col--4">
      <h3>
        <Translate id="pages.Home.OtherNewsSources.title">Other sources of news</Translate>
      </h3>
      <p>
        <Translate id="pages.Home.OtherNewsSources.description">The following blogs may have additional news about the progress of the WiX toolset:</Translate></p>
      <ul>
        <li><Link to="https://robmensching.com/blog/"><Translate id="pages.Home.OtherNewsSources.listItem.1">Rob Mensching</Translate></Link></li>
        <li><Link to="https://www.joyofsetup.com/"><Translate id="pages.Home.OtherNewsSources.listItem.2">Bob Arnson</Translate></Link></li>
        <li><Link to="https://www.firegiant.com/blog/"><Translate id="pages.Home.OtherNewsSources.listItem.3">FireGiant's Setup Matters</Translate></Link></li>
      </ul>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <MoreAbout />
              <RecentNews />
              <OtherNewsSources />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
