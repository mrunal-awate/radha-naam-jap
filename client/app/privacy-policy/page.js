// export const metadata = { title: "Privacy Policy — Radha Naam Jap Counter" };

// export default function PrivacyPolicyPage() {
//   return (
//     <div>
//       <h1 className="page-title">Privacy Policy</h1>
//       <p className="content-text" style={{ marginBottom: 8, fontSize: 12 }}>
//         Last updated: [DATE] — this is a starting template, not legal advice.
//         Have it reviewed before you rely on it, especially once you enable
//         ads or collect payment information.
//       </p>

//       <section style={{ marginTop: 24 }}>
//         <h2 className="content-heading">What we collect</h2>
//         <p className="content-text">
//           If you create an account, we collect your name, email address, and
//           a securely hashed version of your password (we never store your
//           password in plain text). If you use the japa counter, we store
//           your chanting counts per mantra per day, associated with your
//           account. If you use the site without an account (guest mode),
//           your counts are stored only in your browser's local storage and
//           are not sent to our servers unless you register.
//         </p>
//       </section>

//       <section style={{ marginTop: 24 }}>
//         <h2 className="content-heading">How we use it</h2>
//         <p className="content-text">
//           Your data is used to provide the core functionality of this site —
//           saving and displaying your chanting statistics — and is not sold
//           to third parties.
//         </p>
//       </section>

//       <section style={{ marginTop: 24 }}>
//         <h2 className="content-heading">Cookies and local storage</h2>
//         <p className="content-text">
//           We use your browser's local storage to keep you signed in and to
//           store guest counts before you register.
//           {/* TODO: once AdSense/Analytics is added, add a paragraph here
//               disclosing that Google and its partners use cookies to serve
//               ads and measure traffic, and link to Google's own policy at
//               policies.google.com/technologies/partner-sites */}
//         </p>
//       </section>

//       <section style={{ marginTop: 24 }}>
//         <h2 className="content-heading">Your rights</h2>
//         <p className="content-text">
//           You can request deletion of your account and associated data by
//           contacting us — see the Contact page.
//         </p>
//       </section>

//       <section style={{ marginTop: 24 }}>
//         <h2 className="content-heading">Changes to this policy</h2>
//         <p className="content-text">
//           We may update this policy from time to time. Continued use of the
//           site after changes means you accept the updated policy.
//         </p>
//       </section>
//     </div>
//   );
// }





export const metadata = {
  title: "Privacy Policy — Radha Naam Jap Counter",
  description:
    "Privacy Policy for the Radha Naam Jap Counter website explaining how we collect, use, and protect information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <h1 className="page-title">Privacy Policy</h1>

      <p
        className="content-text"
        style={{ marginBottom: 8, fontSize: 12 }}
      >
        Last updated: August 25, 2026
      </p>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">1. Introduction</h2>

        <p className="content-text">
          Radha Naam Jap Counter ("we", "our", or "us") respects your
          privacy and is committed to protecting your personal information.
          This Privacy Policy explains how information may be collected,
          used, stored, and shared when you access or use the Radha Naam Jap
          Counter website and related services (collectively, the
          "Services").
        </p>

        <p className="content-text">
          By using the Services, you acknowledge that you have read and
          understood this Privacy Policy. If you do not agree with this
          Privacy Policy, please do not use the Services.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          2. Information We Collect
        </h2>

        <p className="content-text">
          The information we collect depends on how you use the website.
          We aim to collect only information that is reasonably necessary
          to provide and improve our Services.
        </p>

        <h3 className="content-heading" style={{ marginTop: 16 }}>
          2.1 Account Information
        </h3>

        <p className="content-text">
          If you create an account, we may collect information such as your
          name, email address, and account authentication information.
        </p>

        <p className="content-text">
          Passwords, where used, are stored using appropriate security
          measures such as password hashing. We do not intentionally store
          your password in plain text.
        </p>

        <h3 className="content-heading" style={{ marginTop: 16 }}>
          2.2 Japa and Progress Information
        </h3>

        <p className="content-text">
          When you use the japa counter while signed in, we may store
          information associated with your account, such as mantra counts,
          progress, dates, goals, or related activity required to provide
          the counting and tracking functionality.
        </p>

        <h3 className="content-heading" style={{ marginTop: 16 }}>
          2.3 Guest Usage
        </h3>

        <p className="content-text">
          You may be able to use certain features without creating an
          account. In guest mode, information such as your japa count or
          preferences may be stored locally in your browser using local
          storage or similar browser technologies.
        </p>

        <p className="content-text">
          Information stored only in your browser is not necessarily
          transmitted to our servers unless a feature specifically requires
          it.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          3. How We Use Information
        </h2>

        <p className="content-text">
          We may use information collected through the Services for
          purposes including:
        </p>

        <ul className="content-text">
          <li>Providing and maintaining the Naam Jap and japa counter features.</li>
          <li>Saving and displaying your chanting progress.</li>
          <li>Providing account-related functionality.</li>
          <li>Improving website performance and user experience.</li>
          <li>Understanding how visitors use our Services.</li>
          <li>Detecting and preventing abuse, fraud, or security issues.</li>
          <li>Responding to questions, feedback, or support requests.</li>
          <li>Maintaining and improving our website and services.</li>
          <li>Complying with applicable legal obligations.</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          4. Cookies and Local Storage
        </h2>

        <p className="content-text">
          Our website may use cookies, local storage, and similar
          technologies to provide functionality, remember preferences,
          maintain sessions, and understand how visitors interact with the
          website.
        </p>

        <p className="content-text">
          Local storage may be used to store guest japa counts, preferences,
          or other information necessary for website functionality.
        </p>

        <p className="content-text">
          You can control or remove cookies and local-storage data through
          your browser settings. Disabling certain technologies may affect
          some features of the website.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          5. Analytics and Usage Information
        </h2>

        <p className="content-text">
          We may use analytics services to understand website traffic,
          visitor behavior, performance, and general usage trends. These
          services may collect information such as pages visited, browser
          type, approximate location, device information, referral
          information, and interactions with the website.
        </p>

        <p className="content-text">
          Analytics information is used to understand and improve the
          website rather than to identify individual visitors where
          possible.
        </p>

        <p className="content-text">
          If analytics services are added or changed, the relevant
          third-party provider's privacy practices may also apply.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          6. Advertising and Google AdSense
        </h2>

        <p className="content-text">
          We may display advertisements on the website through third-party
          advertising providers, including Google AdSense.
        </p>

        <p className="content-text">
          Advertising providers may use cookies or similar technologies to
          provide, personalize, measure, and improve advertisements.
          Depending on your location and applicable privacy requirements,
          you may be provided with choices regarding personalized
          advertising.
        </p>

        <p className="content-text">
          Google and its advertising partners may collect or use
          information in accordance with their own privacy policies and
          applicable advertising technologies.
        </p>

        <p className="content-text">
          For information about how Google uses information from sites and
          apps that use its services, please review Google's relevant
          privacy information.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          7. Third-Party Services
        </h2>

        <p className="content-text">
          We may use third-party service providers to operate and maintain
          parts of the website. These may include hosting providers,
          database providers, analytics services, email services, security
          services, advertising providers, or other technology providers.
        </p>

        <p className="content-text">
          These providers may process information on our behalf when
          necessary to provide their services. We do not authorize
          third-party service providers to use your personal information
          for purposes unrelated to the services they provide to us,
          except where otherwise permitted by law or with your consent.
        </p>

        <p className="content-text">
          Third-party websites or services linked from our website may have
          their own privacy policies. We are not responsible for the
          privacy practices of websites or services that we do not control.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          8. Information Sharing
        </h2>

        <p className="content-text">
          We do not sell or rent your personal information to third parties
          for their own direct marketing purposes.
        </p>

        <p className="content-text">
          We may share information with service providers when reasonably
          necessary to operate the website, provide requested services,
          maintain security, process information, or comply with legal
          obligations.
        </p>

        <p className="content-text">
          We may also disclose information when required by applicable law,
          legal process, court order, or government request, or when
          reasonably necessary to protect our rights, users, property, or
          security.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          9. Data Security
        </h2>

        <p className="content-text">
          We take reasonable technical and organizational measures to
          protect information against unauthorized access, alteration,
          disclosure, or destruction.
        </p>

        <p className="content-text">
          These measures may include secure connections, access controls,
          password hashing, and appropriate protection of our systems and
          databases.
        </p>

        <p className="content-text">
          However, no method of transmission over the internet or method
          of electronic storage is completely secure. Therefore, we cannot
          guarantee absolute security of information.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          10. Data Retention
        </h2>

        <p className="content-text">
          We retain personal information only for as long as reasonably
          necessary to provide our Services, maintain accounts, comply with
          legal obligations, resolve disputes, prevent abuse, and enforce
          our agreements.
        </p>

        <p className="content-text">
          If you request deletion of your account, we will take reasonable
          steps to delete or anonymize associated personal information,
          subject to information that we may be required or permitted to
          retain under applicable law.
        </p>

        <p className="content-text">
          Information stored locally in your browser remains on your device
          until you clear it, remove it through browser settings, or the
          relevant storage is otherwise removed.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          11. Your Privacy Rights and Choices
        </h2>

        <p className="content-text">
          Depending on your location and applicable law, you may have
          rights regarding your personal information, including the right
          to:
        </p>

        <ul className="content-text">
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of your account or personal information.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Object to or restrict certain processing where applicable.</li>
          <li>Request a copy of certain information where applicable.</li>
        </ul>

        <p className="content-text">
          Some rights may be subject to limitations or exceptions under
          applicable law.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          12. Account and Data Deletion
        </h2>

        <p className="content-text">
          If you have an account and want to request deletion of your
          account and associated personal information, contact us using
          the email address provided below.
        </p>

        <p className="content-text">
          Please include enough information for us to identify the account
          associated with your request. We may need to verify your identity
          before completing a deletion request.
        </p>

        <p className="content-text">
          Some information may be retained where required by law or where
          reasonably necessary for security, fraud prevention, dispute
          resolution, or other legitimate purposes.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          13. Children's Privacy
        </h2>

        <p className="content-text">
          Our website is not knowingly intended to collect personal
          information from children in violation of applicable law. If you
          believe that a child has provided us with personal information
          without appropriate consent, please contact us so that we can
          review and take appropriate action.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          14. International Data Processing
        </h2>

        <p className="content-text">
          Depending on the hosting, database, analytics, advertising, and
          other technology providers we use, information may be processed
          or stored in countries other than the country where you live.
        </p>

        <p className="content-text">
          Where required by applicable law, we will take reasonable steps
          to ensure appropriate protections are available for such
          transfers.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          15. External Links
        </h2>

        <p className="content-text">
          Our website may contain links to external websites. These
          websites operate independently from us and may have different
          privacy practices. We encourage you to review the privacy policy
          of any external website you visit.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          16. Changes to This Privacy Policy
        </h2>

        <p className="content-text">
          We may update this Privacy Policy from time to time to reflect
          changes in our website, technology, services, legal requirements,
          or privacy practices.
        </p>

        <p className="content-text">
          When we make changes, we will update the "Last updated" date at
          the top of this page. We encourage you to review this page
          periodically.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className="content-heading">
          17. Contact Us
        </h2>

        <p className="content-text">
          If you have questions about this Privacy Policy, want to exercise
          an applicable privacy right, or have a concern about how your
          information is handled, please contact us:
        </p>

        <p className="content-text">
          <strong>Email:</strong>{" "}
          <a href="mailto:unfiltereddaysof106@gmail.com">
            unfiltereddaysof106@gmail.com
          </a>
        </p>

        <p className="content-text">
          We aim to respond to privacy-related requests within a reasonable
          period and within any timeframe required by applicable law.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <p
          className="content-text"
          style={{ fontSize: 12, opacity: 0.7 }}
        >
          Effective date: August 25, 2026
          <br />
          Last updated: August 25, 2026
        </p>
      </section>
    </div>
  );
}