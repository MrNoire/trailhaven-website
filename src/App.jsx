import React, { useEffect, useState } from "react";
import {
  Shield,
  Droplets,
  Trees,
  Mountain,
  ArrowRight,
  Search,
  Compass,
  Users,
  Star,
  Radio,
  Camera,
  Route,
  Apple,
  Tent,
  CloudSun,
  Waves,
  MessageCircle,
  Bookmark,
  X,
  AlertTriangle,
  MapPinned,
} from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjglnekz";

const backgrounds = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2400&auto=format&fit=crop",
];

const demoSteps = [
  {
    label: "Choose outing",
    title: "Select the trip type",
    text: "Hiking, camping, survival practice or emergency planning changes how the app reads each place.",
  },
  {
    label: "Scan map",
    title: "Analyze the region",
    text: "TrailHaven scans water access, shelter value, terrain, weather exposure and accessibility.",
  },
  {
    label: "Read place",
    title: "Understand the score",
    text: "Each location gets a clear outdoor potential score with practical field notes.",
  },
  {
    label: "Compare & save",
    title: "Plan smarter",
    text: "Save areas, compare them, and use community notes before choosing where to go.",
  },
];

export default function App() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bg, setBg] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBg((current) => (current + 1) % backgrounds.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep((current) => (current + 1) % demoSteps.length);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          project: "TrailHaven Waitlist",
          source: "TrailHaven landing page",
        }),
      });

      if (response.ok) {
        setDone(true);
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not submit email. Please try again.");
    } finally {
      setSubmitting(false);
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

            <button disabled={submitting}>
              {submitting ? "Joining..." : "Join waitlist"}{" "}
              <ArrowRight size={18} />
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

      <section className="section demoShowcase" id="demo">
        <div className="demoIntro">
          <span>Animated product demo</span>
          <h2>See the app think through the outdoors.</h2>
          <p>
            A startup-style walkthrough showing how TrailHaven can scan an area,
            score outdoor potential, compare places, and help users plan smarter.
          </p>
        </div>

        <div className="demoStepper">
          {demoSteps.map((step, index) => (
            <button
              key={step.label}
              type="button"
              className={`stepButton ${demoStep === index ? "active" : ""}`}
              onClick={() => setDemoStep(index)}
            >
              <span>{index + 1}</span>
              <b>{step.label}</b>
            </button>
          ))}
        </div>

        <div className="demoGrid">
          <div className="demoMapCard">
            <div className="demoMapTop">
              <div>
                <span>{demoSteps[demoStep].label}</span>
                <h3>{demoSteps[demoStep].title}</h3>
                <p>{demoSteps[demoStep].text}</p>
              </div>

              <div className="demoScoreBubble">
                <strong>{demoStep === 0 ? "—" : demoStep === 1 ? "72%" : demoStep === 2 ? "61%" : "78%"}</strong>
                <small>{demoStep === 0 ? "Tap" : demoStep === 1 ? "Solid" : demoStep === 2 ? "Good" : "Saved"}</small>
              </div>
            </div>

            <div className={`demoMap activeStep${demoStep}`}>
              <div className="mapGlow"></div>
              <div className="scanRing ringOne"></div>
              <div className="scanRing ringTwo"></div>

              <div className="mapPin green pinOne">77%</div>
              <div className="mapPin yellow pinTwo">61%</div>
              <div className="mapPin orange pinThree">49%</div>
              <div className="mapPin green pinFour">73%</div>

              <div className="mapLegend">
                <span><i className="legendGood"></i> Great spots</span>
                <span><i className="legendOkay"></i> Okay areas</span>
                <span><i className="legendRisk"></i> Risky areas</span>
              </div>

              <div className="mapBottomSheet">
                <div>
                  <span>Forest mountain in Romania</span>
                  <h4>Carpathian Forest Arc</h4>
                  <p>Strong shelter value, good water access, mixed terrain risk.</p>
                </div>

                <button type="button" onClick={() => setNotesOpen(true)}>
                  View Outdoor Notes <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="demoSide">
            <div className="outingCard">
              <span>Outing modes</span>
              <h3>Choose what you're planning.</h3>

              <div className="modePills">
                <div className={demoStep === 0 ? "modeActive" : ""}>
                  <Route size={18} />
                  Hiking
                </div>
                <div>
                  <Tent size={18} />
                  Camping
                </div>
                <div>
                  <Compass size={18} />
                  Survival practice
                </div>
                <div>
                  <Shield size={18} />
                  Emergency planning
                </div>
              </div>
            </div>

            <div className="readCard">
              <div className="readTop">
                <span>Place read</span>
                <strong>{demoStep === 3 ? "78%" : "61%"}</strong>
              </div>

              <Metric icon={<Droplets size={17} />} label="Water" value="79%" />
              <Metric icon={<Trees size={17} />} label="Shelter" value="86%" />
              <Metric icon={<Mountain size={17} />} label="Terrain" value="54%" />
              <Metric icon={<CloudSun size={17} />} label="Weather risk" value="48%" />
            </div>
          </div>
        </div>

        <div className="demoMiniCards">
          <DemoMini icon={<Waves />} title="Water access" text="Rivers, lakes and nearby water signals." />
          <DemoMini icon={<Trees />} title="Shelter value" text="Forest cover, terrain and usable protection." />
          <DemoMini icon={<MessageCircle />} title="Community notes" text="Real observations from people who visited." />
          <DemoMini icon={<Bookmark />} title="Saved places" text="Compare areas before choosing a trip." />
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

      {notesOpen && (
        <div className="notesModalWrap" onClick={() => setNotesOpen(false)}>
          <div className="notesModal" onClick={(e) => e.stopPropagation()}>
            <div className="notesTop">
              <div>
                <span>Terrain analysis</span>
                <h2>Carpathian Forest Arc</h2>
              </div>

              <button className="closeBtn" onClick={() => setNotesOpen(false)}>
                <X size={18} /> Close
              </button>
            </div>

            <div className="notesHero">
              <div>
                <MapPinned size={22} />
                <span>Outdoor Read</span>
                <strong>61%</strong>
                <p>Good potential with moderate terrain and weather risk.</p>
              </div>

              <div>
                <AlertTriangle size={22} />
                <span>Field Warning</span>
                <strong>Signal drop</strong>
                <p>Community notes mention weak signal deeper in the valley.</p>
              </div>
            </div>

            <div className="notesGrid">
              <div>
                <h3>Water Access</h3>
                <p>
                  Freshwater streams detected within 1.2km radius. Multiple
                  downhill flow points nearby.
                </p>
              </div>

              <div>
                <h3>Shelter Potential</h3>
                <p>
                  Dense tree coverage supports natural shelter, wind protection,
                  and short-term survival practice.
                </p>
              </div>

              <div>
                <h3>Terrain Risk</h3>
                <p>
                  Moderate elevation changes. Wet ground and muddy paths are
                  likely after rainfall.
                </p>
              </div>

              <div>
                <h3>Community Notes</h3>
                <p>
                  Users report good camping conditions, strong natural cover,
                  and limited visibility after sunset.
                </p>
              </div>
            </div>

            <div className="aiReadout">
              <span>AI Analysis</span>
              <p>
                This region appears suitable for camping, long hikes, emergency
                shelter practice and outdoor survival planning. Best used with
                offline maps, weather checks and backup communication.
              </p>
            </div>
          </div>
        </div>
      )}

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
          opacity: 0.7;
          cursor: not-allowed;
        }

        small {
          display: block;
          margin-top: 14px;
          color: #9dffbf;
          font-weight: 900;
        }

        .errorText {
          color: #ffb5a5;
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          width: 100%;
        }

        .miniStats div {
          background: rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          justify-content: center;
          min-width: 0;
          overflow: hidden;
        }

        .miniStats svg {
          color: #9dffbf;
        }

        .miniStats b {
          font-size: 18px;
          line-height: 1;
        }

        .miniStats small {
          margin: 0;
          color: rgba(255,255,255,0.6);
          font-size: 10px;
          text-align: center;
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

        .demoShowcase {
          display: flex;
          flex-direction: column;
          gap: 34px;
          overflow: hidden;
        }

        .demoIntro {
          max-width: 820px;
        }

        .demoIntro span {
          color: #9dffbf;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 900;
          font-size: 13px;
        }

        .demoIntro h2 {
          font-size: clamp(38px, 5vw, 68px);
          line-height: 1;
          margin: 18px 0 24px;
          letter-spacing: -3px;
        }

        .demoStepper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .stepButton {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          padding: 16px;
          border-radius: 22px;
          justify-content: flex-start;
        }

        .stepButton span {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.1);
          color: #9dffbf;
        }

        .stepButton.active {
          background: rgba(141,255,176,0.14);
          border-color: rgba(157,255,191,0.42);
          box-shadow: 0 18px 50px rgba(0,0,0,0.24);
        }

        .demoGrid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
        }

        .demoMapCard,
        .outingCard,
        .readCard,
        .demoMiniCards > div {
          border-radius: 32px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(22px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.22);
        }

        .demoMapCard {
          padding: 26px;
          min-height: 650px;
        }

        .demoMapTop {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 22px;
        }

        .demoMapTop span,
        .outingCard span,
        .readTop span {
          color: #9dffbf;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 900;
          font-size: 12px;
        }

        .demoMapTop h3,
        .outingCard h3 {
          font-size: 36px;
          line-height: 1;
          margin: 12px 0 0;
          max-width: 480px;
        }

        .demoMapTop p {
          font-size: 16px;
          margin: 14px 0 0;
        }

        .demoScoreBubble {
          width: 104px;
          height: 104px;
          border-radius: 28px;
          border: 1px solid rgba(157,255,191,0.5);
          display: grid;
          place-items: center;
          text-align: center;
          background: rgba(141,255,176,0.08);
          flex-shrink: 0;
        }

        .demoScoreBubble strong {
          display: block;
          font-size: 30px;
          color: #9dffbf;
        }

        .demoScoreBubble small {
          margin: 0;
          color: rgba(255,255,255,0.65);
        }

        .demoMap {
          position: relative;
          min-height: 620px;
          border-radius: 30px;
          overflow: hidden;
          background:
            linear-gradient(rgba(4,13,8,0.1), rgba(4,13,8,0.72)),
            url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .activeStep1 {
          animation: subtleZoom 3.6s ease both;
        }

        .activeStep2 .mapBottomSheet {
          animation: sheetPop 0.55s ease both;
        }

        .activeStep3 .mapPin {
          animation: pinBounce 0.8s ease both;
        }

        @keyframes subtleZoom {
          from { background-size: 100%; }
          to { background-size: 112%; }
        }

        @keyframes sheetPop {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pinBounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .mapGlow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 42% 42%, rgba(141,255,176,0.28), transparent 26%),
            radial-gradient(circle at 60% 58%, rgba(255,219,117,0.16), transparent 22%);
        }

        .scanRing {
          position: absolute;
          left: 46%;
          top: 44%;
          border: 2px solid rgba(141,255,176,0.5);
          border-radius: 999px;
          transform: translate(-50%, -50%);
          animation: mapPulse 2.8s infinite ease-out;
        }

        .ringOne {
          width: 120px;
          height: 120px;
        }

        .ringTwo {
          width: 210px;
          height: 210px;
          animation-delay: 0.7s;
        }

        @keyframes mapPulse {
          from {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.4);
          }
        }

        .mapPin {
          position: absolute;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 950;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(5,20,12,0.82);
          backdrop-filter: blur(16px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }

        .mapPin::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          margin-right: 8px;
          background: currentColor;
        }

        .green {
          color: #9dffbf;
        }

        .yellow {
          color: #e4cd77;
        }

        .orange {
          color: #d49a62;
        }

        .pinOne {
          left: 38%;
          top: 35%;
        }

        .pinTwo {
          left: 56%;
          top: 48%;
        }

        .pinThree {
          left: 28%;
          top: 58%;
        }

        .pinFour {
          right: 18%;
          top: 30%;
        }

        .mapLegend {
          position: absolute;
          left: 18px;
          right: 18px;
          top: 18px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          padding: 12px 14px;
          border-radius: 999px;
          background: rgba(5,20,12,0.78);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(18px);
          font-size: 13px;
          font-weight: 900;
        }

        .mapLegend span {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,0.72);
        }

        .mapLegend i {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          display: block;
        }

        .legendGood { background: #9dffbf; }
        .legendOkay { background: #e4cd77; }
        .legendRisk { background: #d49a62; }

        .mapBottomSheet {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 12px;
          padding: 22px;
          border-radius: 28px;
          background: rgba(5,20,12,0.82);
          border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(20px);
        }

        .mapBottomSheet span {
          color: #9dffbf;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1.5px;
          font-weight: 900;
        }

        .mapBottomSheet h4 {
          font-size: 28px;
          margin: 8px 0;
        }

        .mapBottomSheet p {
          font-size: 15px;
          margin: 0 0 18px;
        }

        .mapBottomSheet button {
          width: 100%;
        }

        .demoSide {
          display: grid;
          gap: 24px;
        }

        .outingCard,
        .readCard {
          padding: 26px;
        }

        .modePills {
          display: grid;
          gap: 12px;
          margin-top: 24px;
        }

        .modePills div {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          font-weight: 900;
        }

        .modePills div.modeActive {
          border-color: rgba(157,255,191,0.4);
          background: rgba(141,255,176,0.13);
        }

        .modePills svg {
          color: #9dffbf;
        }

        .readTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .readTop strong {
          font-size: 42px;
          color: #e4cd77;
        }

        .metric {
          margin-bottom: 20px;
        }

        .metricHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .metricHead div {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .metricHead svg {
          color: #9dffbf;
        }

        .metricTrack {
          height: 11px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.1);
        }

        .metricFill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #8dffb0, #e4cd77);
        }

        .demoMiniCards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .demoMiniCards > div {
          padding: 22px;
        }

        .demoMiniCards svg {
          color: #9dffbf;
          margin-bottom: 18px;
        }

        .demoMiniCards h3 {
          margin: 0 0 8px;
          font-size: 20px;
        }

        .demoMiniCards p {
          margin: 0;
          font-size: 14px;
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

        .notesModalWrap {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 999;
          animation: modalFade 0.25s ease both;
        }

        .notesModal {
          width: min(960px, 100%);
          max-height: min(86vh, 900px);
          overflow-y: auto;
          border-radius: 36px;
          padding: 34px;
          background: rgba(5,20,12,0.96);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 40px 120px rgba(0,0,0,0.5);
          animation: modalRise 0.35s ease both;
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalRise {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .notesTop {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
        }

        .notesTop span,
        .aiReadout span,
        .notesHero span {
          color: #9dffbf;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 12px;
          font-weight: 900;
        }

        .notesTop h2 {
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1;
          margin: 12px 0 0;
          letter-spacing: -2px;
        }

        .closeBtn {
          background: rgba(255,255,255,0.1);
          color: white;
          height: fit-content;
        }

        .notesHero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .notesHero > div,
        .notesGrid div,
        .aiReadout {
          padding: 24px;
          border-radius: 24px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .notesHero svg {
          color: #9dffbf;
          margin-bottom: 16px;
        }

        .notesHero strong {
          display: block;
          font-size: 28px;
          margin: 8px 0 0;
        }

        .notesHero p,
        .notesGrid p,
        .aiReadout p {
          margin-bottom: 0;
          font-size: 15px;
          line-height: 1.65;
        }

        .notesGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .notesGrid h3 {
          margin-top: 0;
          font-size: 22px;
        }

        .aiReadout {
          margin-top: 18px;
          background: linear-gradient(
            135deg,
            rgba(141,255,176,0.12),
            rgba(255,255,255,0.04)
          );
          border: 1px solid rgba(141,255,176,0.2);
        }

        @media (max-width: 1050px) {
          .hero,
          .demoGrid {
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
          .demoMiniCards,
          .notesHero,
          .notesGrid,
          .demoStepper {
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

          .demoMapTop,
          .notesTop {
            flex-direction: column;
          }

          .demoScoreBubble {
            width: 100%;
          }

          .notesModal {
            padding: 24px;
          }

          .mapLegend {
            border-radius: 20px;
          }
        }

        @media (max-width: 520px) {
          .phone {
            width: 300px;
            height: 600px;
          }

          .demoMapCard {
            padding: 14px;
          }

          .demoMap {
            min-height: 700px;
          }

          .mapBottomSheet {
            left: 14px;
            right: 14px;
            bottom: 14px;
            padding: 18px;
          }

          .mapBottomSheet h4 {
            font-size: 22px;
          }

          .mapLegend {
            left: 12px;
            right: 12px;
            top: 12px;
            padding: 10px;
            gap: 8px;
            border-radius: 18px;
            font-size: 11px;
          }

          .pinFour {
            display: none;
          }

          .demoMapTop h3 {
            font-size: 28px;
          }

          .demoMapTop p {
            font-size: 14px;
          }

          .demoScoreBubble {
            height: 84px;
          }

          .mapPin {
            padding: 8px 12px;
            font-size: 13px;
          }

          .miniStats {
            gap: 6px;
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

function Metric({ icon, label, value }) {
  return (
    <div className="metric">
      <div className="metricHead">
        <div>
          {icon}
          <span>{label}</span>
        </div>
        <span>{value}</span>
      </div>

      <div className="metricTrack">
        <div className="metricFill" style={{ width: value }} />
      </div>
    </div>
  );
}

function DemoMini({ icon, title, text }) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
