import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contect.css"; // Create this file next to Contect.jsx
import { IoLogoGitlab } from "react-icons/io5";

export default function Contect() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setStatus({ type: "loading", msg: "Sending..." });
      // TODO: Hook to your backend. Example with axios if you have `api` configured:
      // await api.post("/contact/", form);
      await new Promise((r) => setTimeout(r, 800)); // demo
      setStatus({ type: "success", msg: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", msg: "Something went wrong. Please try again." });
    }
  };

  return (
    <section className="contect-section py-5">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Left: Contact card */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100 contect-card">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                  <IoLogoGitlab size={40} />
                  <span>We'd love to hear from you</span>
                </div>
                <h2 className="h3 fw-bold mb-3">Get in touch</h2>
                <p className="mb-4 text-secondary">
                  Questions, feedback, or collabs—send us a note and we’ll reply shortly.
                </p>

                {status.type === "success" && (
                  <div className="alert alert-success py-2" role="alert">
                    {status.msg}
                  </div>
                )}
                {status.type === "error" && (
                  <div className="alert alert-danger py-2" role="alert">
                    {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="plese enter your name"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@example.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="I have a question about..."
                      />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        rows={5}
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                      />
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>

                    <div className="col-12 d-flex align-items-center gap-3">
                      <button type="submit" className="btn btn-dark px-4" disabled={status.type === "loading"}>
                        {status.type === "loading" ? "Sending..." : "Send message"}
                      </button>
                      <span className="text-warning small">
                        <strong>Support hours:</strong> Mon–Sat, 9:00AM–10:00 PM
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Info + Map */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100 contect-card">
              <div className="card-body p-4 p-md-5 d-flex flex-column">
                <h3 className="h5 fw-bold mb-3">Contact info</h3>
                <ul className="list-unstyled mb-4 contect-info">
                  <li><span className="label">Email:</span> support@devoutlet.example</li>
                  <li><span className="label">Phone:</span> +91 98765 43210</li>
                  <li><span className="label">Address:</span> 221B Baker Street, Mumbai 400001</li>
                </ul>

                <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm mt-auto">
                  <iframe
                    title="DevOutlet Location"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Mumbai%20India&output=embed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
