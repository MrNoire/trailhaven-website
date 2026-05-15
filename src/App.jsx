import React, { useEffect, useState } from "react";
import {
  Map,
  Shield,
  Droplets,
  Trees,
  Mountain,
  ArrowRight,
  Search,
  Compass,
  Users,
  Star,
  Play,
  Radio,
  Camera,
  Route,
  Apple,
  Sparkles,
  Waves,
  Tent,
  MessageCircle,
} from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjglnekz";

const backgrounds = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2400&auto=format&fit=crop",
];

export default function App() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bg, setBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBg((current) => (current + 1) % backgrounds.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  async function submit(e) {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Please enter your email first.");
      return;
    }

    setLoading(true);
    setError("");
    setDone(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          project: "TrailHaven Waitlist",
          source: "TrailHaven landing page",
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      setDone(true);
      setEmail("");
    } catch (err) {
      setError("Could not join the waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      {backgrounds.map((image, index) => (
        <div
          key={image}
          className={`background ${index === bg ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="overlay" />

      <nav className="nav">
        <div className="brand">
          <Mountain size={22} />
          <span>TrailHaven</span>
        </div>

        <div className="navLinks">
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#community">Community</a>
          <a className="navButton" href="#waitlist">
            Join waitlist
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <div className="badge">
            <Shield size={16} />
            Outdoor survival intelligence
          </div>

          <h1>Know where you could survive before you go.</h1>

          <p>
            TrailHaven helps hikers, campers and survival-minded explorers scan
            outdoor areas for water access, shelter potential, camping quality,
            terrain signals and trusted community knowledge.
          </p>

          <form onSubmit={submit} className="form" id="waitlist">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button disabled={loading}>
              {loading ? "Joining..." : "Join waitlist"} <ArrowRight size={18} />
            </button>
          </form>

          {done && <small>You’re on the early access list.</small>}
          {error && <small className="errorText">{error}</small>}

          <div className="proof">
            <span>1,247+ early explorers interested</span>
            <span>Built for hikers, campers and survival training</span>
          </div>
        </div>

        <div className="heroVisual">
          <div className="phone">
            <div className="notch" />

            <div className="screen">
              <div className="phoneTop">
                <span>TrailHaven</span>
                <Radio size={18} />
              </div>

              <div className="mapMock">
                <div className="scan one" />
                <div className="scan two" />
                <div className="scan three" />
                <div className="pin">82%</div>
              </div>

              <div className="score">
                <span>Survival scan</span>
                <strong>High potential</strong>

                <div className="miniStats">
                  <div>
                    <Droplets size={17} />
                    <b>82%</b>
                    <small>Water</small>
                  </div>

                  <div>
                    <Trees size={17} />
                    <b>74%</b>
                    <small>Shelter</small>
                  </div>

                  <div>
                    <Star size={17} />
                    <b>4.8</b>
                    <small>Rating</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sideCards">
            <div className="floatingCard">
              <Droplets size={18} />
              Freshwater nearby
            </div>

            <div className="floatingCard">
              <Camera size={18} />
              42 community photos
            </div>

            <div className="floatingCard">
              <Tent size={18} />
              Good camp potential
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="sectionHeader">
          <span>Core features</span>
          <h2>A survival map for real outdoor planning.</h2>
        </div>

        <div className="featureGrid">
          <Feature icon={<Droplets />} title="Water access" text="See nearby rivers, lakes and possible water sources when planning a route." />
          <Feature icon={<Trees />} title="Shelter potential" text="Understand terrain and areas that may support shelter, rest or camping." />
          <Feature icon={<Mountain />} title="Camping suitability" text="Find better areas for hikes, campsites and survival practice scenarios." />
          <Feature icon={<Users />} title="Community knowledge" text="Users can share photos, notes, ratings, trails and real area experience." />
        </div>
      </section>

      <section className="section demo" id="demo">
        <div>
          <div className="sectionHeader">
            <span>Product vision</span>
            <h2>A startup-style demo section for the app.</h2>
          </div>

          <p>
            Later this can become a real video showing the map zoom, survival
            score, water layer, shelter layer, campsite reviews and community
            posts.
          </p>

          <button className="watch">
            <Play size={18} />
            Watch preview
          </button>
        </div>

        <div className="demoPanel">
          <div className="demoTop">
            <span>Live area scan</span>
            <Sparkles size={18} />
          </div>

          <div className="bars">
            <Bar icon={<Waves size={18} />} label="Water access" value="82%" width="82%" />
            <Bar icon={<Trees size={18} />} label="Shelter score" value="74%" width="74%" />
            <Bar icon={<Tent size={18} />} label="Camping quality" value="68%" width="68%" />
            <Bar icon={<MessageCircle size={18} />} label="Community trust" value="91%" width="91%" />
          </div>
        </div>
      </section>

      <section className="section split">
        <div>
          <div className="sectionHeader">
            <span>How it works</span>
            <h2>From map search to survival insight in seconds.</h2>
          </div>
        </div>

        <div className="steps">
          <Step number="01" icon={<Search />} title="Search an area" text="Choose a forest, mountain, campsite, trail or region." />
          <Step number="02" icon={<Compass />} title="Scan potential" text="See water, shelter, terrain and camping indicators." />
          <Step number="03" icon={<Route />} title="Plan smarter" text="Use ratings, photos and community notes before you go." />
        </div>
      </section>

      <section className="section community" id="community">
        <div className="sectionHeader">
          <span>Future community</span>
          <h2>Built to become the outdoor knowledge network.</h2>
        </div>

        <div className="communityGrid">
          <Post image="one" title="Camp area report" text="Good flat ground, river nearby, but windy after sunset." />
          <Post image="two" title="Trail condition" text="Muddy path after rain. Better boots recommended." />
          <Post image="three" title="Survival note" text="Plenty of natural cover, weak signal in the valley." />
        </div>
      </section>

      <section className="finalCta">
        <div>
          <Apple size={28} />
          <h2>Early access coming soon.</h2>
          <p>
            Join the waitlist and be first to test TrailHaven when the prototype
            is ready.
          </p>
        </div>

        <a href="#waitlist">
          Join early <ArrowRight size={18} />
        </a>
      </section>

      <footer>
        <strong>TrailHaven</strong>
        <span>Outdoor planning. Survival intelligence. Community knowledge.</span>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, Arial, sans-serif;
          background: #07110c;
        }

        .page {
          min-height: 100vh;
          color: white;
          position: relative;
          overflow-x: hidden;
          background: #07110c;
        }

        .background {
          position: fixed;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 1.5s ease;
          animation: slowMove 18s ease-in-out infinite alternate;
          z-index: 0;
        }

        .background.active {
          opacity: 1;
        }

        @keyframes slowMove {
          from {
            transform: scale(1.05) translateY(0);
          }
          to {
            transform: scale(1.12) translateY(-20px);
          }
        }

        .overlay {
          position: fixed;
          inset: 0;
          background:
            linear-gradient(rgba(3, 12, 7, 0.28), rgba(3, 12, 7, 0.96)),
            radial-gradient(circle at 25% 25%, rgba(81, 255, 155, 0.24), transparent 35%),
            radial-gradient(circle at 80% 20%, rgba(124, 210, 255, 0.12), transparent 30%);
          z-index: 1;
          pointer-events: none;
        }

        .nav {
          position: relative;
          z-index: 5;
          width: min(1180px, calc(100% - 40px));
          margin: 24px auto 0;
          padding: 16px 20px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 20px 80px rgba(0,0,0,0.25);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          font-size: 18px;
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .navLinks a {
          color: rgba(255,255,255,0.76);
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
        }

        .navLinks .navButton {
          color: #07110c;
          background: white;
          padding: 11px 17px;
          border-radius: 999px;
        }

        .hero {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          min-height: calc(100vh - 100px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          padding: 80px 0;
        }

        .heroText,
        .heroVisual {
          animation: fadeUp 0.9s ease both;
        }

        .heroVisual {
          animation-delay: 0.15s;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(80, 255, 160, 0.14);
          border: 1px solid rgba(137, 255, 190, 0.28);
          color: #d9ffe8;
          font-weight: 800;
          margin-bottom: 24px;
        }

        h1 {
          font-size: clamp(50px, 7vw, 92px);
          line-height: 0.95;
          margin: 0;
          max-width: 850px;
          letter-spacing: -4px;
        }

        p {
          font-size: 20px;
          line-height: 1.7;
          color: rgba(255,255,255,0.76);
          max-width: 680px;
          margin: 28px 0;
        }

        .form {
          display: flex;
          gap: 10px;
          padding: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.17);
          border-radius: 20px;
          max-width: 570px;
          backdrop-filter: blur(20px);
          box-shadow: 0 18px 60px rgba(0,0,0,0.25);
        }

        input {
          flex: 1;
          border: none;
          outline: none;
          border-radius: 14px;
          padding: 16px;
          background: rgba(0,0,0,0.38);
          color: white;
          font-size: 16px;
        }

        button,
        .finalCta a {
          border: none;
          text-decoration: none;
          border-radius: 14px;
          padding: 16px 22px;
          background: #8dffb0;
          color: #07110c;
          font-weight: 900;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.72;
        }

        small {
          display: block;
          margin-top: 14px;
          color: #9dffbf;
          font-weight: 900;
        }

        .errorText {
          color: #ffb4a8;
        }

        .proof {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 26px;
          color: rgba(255,255,255,0.72);
          font-weight: 800;
          font-size: 14px;
        }

        .proof span {
          padding: 10px 14px;
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          backdrop-filter: blur(16px);
        }

        .phone {
          width: 330px;
          height: 660px;
          padding: 12px;
          border-radius: 48px;
          background: linear-gradient(145deg, #1f2b24, #050907);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow:
            0 40px 110px rgba(0,0,0,0.65),
            inset 0 0 0 2px rgba(255,255,255,0.05);
          position: relative;
          flex-shrink: 0;
        }

        .notch {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          height: 25px;
          border-radius: 999px;
          background: #050907;
          z-index: 3;
        }

        .screen {
          width: 100%;
          height: 100%;
          border-radius: 38px;
          overflow: hidden;
          background:
            linear-gradient(rgba(3, 12, 7, 0.15), rgba(3, 12, 7, 0.86)),
            url("https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          padding: 52px 18px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .phoneTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 900;
        }

        .mapMock {
          position: relative;
          height: 260px;
          border-radius: 32px;
          background:
            linear-gradient(135deg, rgba(105,255,171,0.18), rgba(0,0,0,0.18)),
            rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          overflow: hidden;
        }

        .scan {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 999px;
          border: 2px solid rgba(141,255,176,0.55);
          transform: translate(-50%, -50%);
          animation: pulse 2.7s ease-out infinite;
        }

        .scan.one {
          width: 110px;
          height: 110px;
        }

        .scan.two {
          width: 180px;
          height: 180px;
          animation-delay: 0.45s;
        }

        .scan.three {
          width: 240px;
          height: 240px;
          animation-delay: 0.9s;
        }

        @keyframes pulse {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.35);
          }
        }

        .pin {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 72px;
          height: 72px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          background: #8dffb0;
          color: #07110c;
          font-weight: 950;
          font-size: 22px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .score {
          border-radius: 30px;
          padding: 20px;
          background: rgba(4, 13, 8, 0.78);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(18px);
        }

        .score > span {
          color: rgba(255,255,255,0.55);
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 900;
        }

        .score > strong {
          display: block;
          font-size: 28px;
          margin: 8px 0 18px;
        }

        .miniStats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .miniStats div {
          background: rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 13px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .miniStats svg {
          color: #9dffbf;
        }

        .miniStats b {
          font-size: 20px;
        }

        .miniStats small {
          margin: 0;
          color: rgba(255,255,255,0.6);
          font-size: 11px;
        }

        .sideCards {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 220px;
        }

        .floatingCard {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 14px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(18px);
          font-weight: 900;
          box-shadow: 0 20px 70px rgba(0,0,0,0.35);
          white-space: nowrap;
        }

        .floatingCard svg {
          color: #9dffbf;
        }

        .section,
        .finalCta {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto 70px;
          padding: 60px;
          border-radius: 36px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(5, 20, 12, 0.68);
          backdrop-filter: blur(24px);
          box-shadow: 0 30px 90px rgba(0,0,0,0.28);
        }

        .sectionHeader span {
          color: #9dffbf;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 900;
          font-size: 13px;
        }

        .sectionHeader h2,
        .finalCta h2 {
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1;
          margin: 16px 0 34px;
          max-width: 820px;
          letter-spacing: -2px;
        }

        .featureGrid,
        .communityGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .feature,
        .step,
        .post {
          padding: 24px;
          border-radius: 28px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.11);
        }

        .featureIcon,
        .stepIcon {
          color: #9dffbf;
          margin-bottom: 22px;
        }

        .feature h3,
        .step h3,
        .post h3 {
          margin: 0 0 10px;
          font-size: 22px;
        }

        .feature p,
        .step p,
        .post p {
          font-size: 15px;
          margin: 0;
          line-height: 1.6;
        }

        .demo {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 34px;
          align-items: center;
        }

        .watch {
          background: white;
        }

        .demoPanel {
          border-radius: 32px;
          padding: 28px;
          background:
            linear-gradient(135deg, rgba(141,255,176,0.12), rgba(255,255,255,0.05)),
            rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.13);
        }

        .demoTop {
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.58);
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 28px;
        }

        .bars {
          display: grid;
          gap: 20px;
        }

        .barHead {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 8px;
          font-weight: 900;
        }

        .barHead div {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .barTrack {
          height: 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          overflow: hidden;
        }

        .barFill {
          height: 100%;
          border-radius: inherit;
          background: #8dffb0;
        }

        .split {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 30px;
          align-items: start;
        }

        .steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .number {
          color: rgba(255,255,255,0.42);
          font-weight: 950;
          margin-bottom: 18px;
          display: block;
        }

        .communityGrid {
          grid-template-columns: repeat(3, 1fr);
        }

        .postImage {
          height: 180px;
          border-radius: 22px;
          background-size: cover;
          background-position: center;
          margin-bottom: 20px;
        }

        .postImage.one {
          background-image: url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=900&auto=format&fit=crop");
        }

        .postImage.two {
          background-image: url("https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=900&auto=format&fit=crop");
        }

        .postImage.three {
          background-image: url("https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=900&auto=format&fit=crop");
        }

        .finalCta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .finalCta h2 {
          margin-bottom: 10px;
        }

        .finalCta p {
          margin-bottom: 0;
        }

        footer {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto 30px;
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          color: rgba(255,255,255,0.6);
        }

        footer strong {
          color: white;
        }

        @media (max-width: 1050px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .heroVisual {
            justify-content: flex-start;
          }
        }

        @media (max-width: 850px) {
          .featureGrid,
          .communityGrid,
          .split,
          .demo {
            grid-template-columns: 1fr;
          }

          .navLinks a:not(.navButton) {
            display: none;
          }

          .form {
            flex-direction: column;
          }

          h1 {
            letter-spacing: -2px;
          }

          .section,
          .finalCta {
            padding: 30px;
          }

          .finalCta {
            flex-direction: column;
            align-items: flex-start;
          }

          .heroVisual {
            flex-direction: column;
            align-items: center;
          }

          .sideCards {
            width: 100%;
            min-width: 0;
          }

          .floatingCard {
            justify-content: center;
          }

          footer {
            flex-direction: column;
            gap: 10px;
          }
        }

        @media (max-width: 520px) {
          .phone {
            width: 300px;
            height: 600px;
          }
        }
      `}</style>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="featureIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="step">
      <span className="number">{number}</span>
      <div className="stepIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Post({ image, title, text }) {
  return (
    <div className="post">
      <div className={`postImage ${image}`} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Bar({ icon, label, value, width }) {
  return (
    <div>
      <div className="barHead">
        <div>
          {icon}
          <span>{label}</span>
        </div>
        <span>{value}</span>
      </div>

      <div className="barTrack">
        <div className="barFill" style={{ width }} />
      </div>
    </div>
  );
}