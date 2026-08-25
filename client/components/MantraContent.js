// export default function MantraContent({ mantra }) {
//   const hasContent = mantra.meaning || mantra.howToChant || (mantra.faq && mantra.faq.length > 0);
//   if (!hasContent) return null;

//   return (
//     <div style={{ textAlign: "left", marginTop: 48 }}>
//       {mantra.meaning && (
//         <section style={{ marginBottom: 28 }}>
//           <h2 className="content-heading">Meaning of {mantra.nameEnglish}</h2>
//           <p className="content-text">{mantra.meaning}</p>
//         </section>
//       )}

//       {mantra.howToChant && (
//         <section style={{ marginBottom: 28 }}>
//           <h2 className="content-heading">How to Chant {mantra.nameEnglish}</h2>
//           <p className="content-text">{mantra.howToChant}</p>
//         </section>
//       )}

//       {mantra.faq && mantra.faq.length > 0 && (
//         <section>
//           <h2 className="content-heading">Frequently Asked Questions</h2>
//           {mantra.faq.map((item, i) => (
//             <div key={i} style={{ marginBottom: 16 }}>
//               <p className="faq-question">{item.question}</p>
//               <p className="content-text">{item.answer}</p>
//             </div>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// }




export default function MantraContent({ mantra }) {
  const hasContent =
    mantra.meaning ||
    mantra.howToChant ||
    (mantra.faq && mantra.faq.length > 0);

  if (!hasContent) return null;

  return (
    <div style={{ textAlign: "left", marginTop: 48 }}>

      {/* Meaning */}
      {mantra.meaning && (
        <section style={{ marginBottom: 32 }}>
          <h2 className="content-heading">
            Meaning of {mantra.nameEnglish}
          </h2>

          <p className="content-text">
            {mantra.meaning}
          </p>
        </section>
      )}

      {/* How to Chant */}
      {mantra.howToChant && (
        <section style={{ marginBottom: 32 }}>
          <h2 className="content-heading">
            How to Chant {mantra.nameEnglish}
          </h2>

          <p className="content-text">
            {mantra.howToChant}
          </p>
        </section>
      )}

      {/* FAQ */}
      {mantra.faq && mantra.faq.length > 0 && (
        <section>
          <h2 className="content-heading">
            Frequently Asked Questions
          </h2>

          {mantra.faq.map((item, index) => (
            <div
              key={index}
              style={{ marginBottom: 20 }}
            >
              <p className="faq-question">
                {item.question}
              </p>

              <p className="content-text">
                {item.answer}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}