export const metadata = { title: "About — Radha Naam Jap Counter" };

export default function AboutPage() {
  return (
    <div>
      <h1 className="page-title">About This Site</h1>
      <p className="content-text" style={{ marginBottom: 16 }}>
        A mala has 108 beads for a reason — counting matters in japa. It
        keeps the mind anchored to the practice instead of wondering how
        far along you are. But a mala isn't always within reach: at a desk,
        on a commute, in a moment between other things. This site exists
        for those moments — a counter that's always in your pocket, on
        whatever screen you already have open.
      </p>
      <p className="content-text" style={{ marginBottom: 16 }}>
        It started as a simple idea: chanting shouldn't need an app
        download, an account, or a subscription just to get going. So the
        counter works the moment you open the page. No sign-up, no wall.
        If you want your count saved across days and devices, an account
        is there when you want it — never before.
      </p>
      <p className="content-text" style={{ marginBottom: 16 }}>
        Alongside the counter, each mantra page carries a short, honest
        description of its meaning and traditional context — written
        plainly, without overstating what any practice can promise.
        Chanting is a personal discipline; this site's job is just to get
        out of its way and help you keep count.
      </p>
      <p className="content-text">
        This is an independent, solo-built project. It isn't affiliated
        with any particular temple, organization, or guru — it's simply a
        tool, offered freely, for a practice that's older than any app.
      </p>
    </div>
  );
}
