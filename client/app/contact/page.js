// export const metadata = { title: "Contact — Radha Naam Jap Counter" };

// // TODO: replace the placeholder email below with your real one before
// // deploying. AdSense reviewers do check that contact info is real and
// // working — a placeholder here will look unfinished to both Google and
// // visitors.
// const CONTACT_EMAIL = "unfiltereddaysof106@gmail.com";

// export default function ContactPage() {
//   return (
//     <div>
//       <h1 className="page-title">Contact</h1>
//       <p className="content-text" style={{ marginBottom: 16 }}>
//         Questions, feedback, or found something not working correctly?
//         Reach out at:
//       </p>
//       <p className="content-text">
//         <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--gold-bright)" }}>
//           {CONTACT_EMAIL}
//         </a>
//       </p>
//     </div>
//   );
// }






export const metadata = {
  title: "Contact Us — Radha Naam Jap Counter",
  description:
    "Contact Radha Naam Jap Counter for questions, feedback, technical issues, or suggestions.",
};

const CONTACT_EMAIL = "unfiltereddaysof106@gmail.com";

export default function ContactPage() {
  return (
    <div>
      <h1 className="page-title">Contact Us</h1>

      <p className="content-text" style={{ marginBottom: 24 }}>
        We’d love to hear from you. If you have a question, suggestion,
        feedback, or notice something that isn't working correctly, feel
        free to get in touch with us.
      </p>

      {/* Contact Card */}
      <section
        style={{
          marginTop: 24,
          padding: 24,
          border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
          borderRadius: 12,
          background: "var(--card-bg, rgba(255,255,255,0.03))",
        }}
      >
        <h2 className="content-heading" style={{ marginTop: 0 }}>
          Get in Touch
        </h2>

        <p className="content-text">
          For general questions, technical issues, suggestions, or
          feedback about Radha Naam Jap Counter, you can contact us by
          email.
        </p>

        <p className="content-text" style={{ marginTop: 18 }}>
          <strong>Email</strong>
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="content-text"
          style={{
            color: "var(--gold-bright)",
            textDecoration: "none",
            fontWeight: 600,
            wordBreak: "break-word",
          }}
        >
          {CONTACT_EMAIL}
        </a>
      </section>

      {/* What You Can Contact Us About */}
      <section style={{ marginTop: 32 }}>
        <h2 className="content-heading">How Can We Help?</h2>

        <p className="content-text">
          You can contact us regarding:
        </p>

        <ul className="content-text">
          <li>Problems with the Naam Jap or counting features</li>
          <li>Audio or mantra-related issues</li>
          <li>Website bugs or technical problems</li>
          <li>Suggestions for new features</li>
          <li>Feedback about your experience</li>
          <li>Privacy or account-related questions</li>
          <li>Copyright or content-related concerns</li>
          <li>General questions about the website</li>
        </ul>
      </section>

      {/* Response Time */}
      <section style={{ marginTop: 32 }}>
        <h2 className="content-heading">Response Time</h2>

        <p className="content-text">
          We aim to review and respond to genuine inquiries as soon as
          reasonably possible. Response times may vary depending on the
          nature and complexity of your request.
        </p>
      </section>

      {/* Privacy */}
      <section style={{ marginTop: 32 }}>
        <h2 className="content-heading">Privacy Requests</h2>

        <p className="content-text">
          If you are contacting us regarding your personal information,
          account deletion, or another privacy-related request, please
          mention "Privacy Request" in the subject line of your email.
        </p>
      </section>

      {/* Closing */}
      <section style={{ marginTop: 32 }}>
        <p
          className="content-text"
          style={{
            fontSize: 13,
            opacity: 0.75,
          }}
        >
          Thank you for using Radha Naam Jap Counter and for helping us
          improve the experience for everyone.
        </p>
      </section>
    </div>
  );
}