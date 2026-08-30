/**
 * Mobile rules for the Serene family.
 *
 * The renderers use fixed grid ratios like 7fr 4fr for their compositions,
 * which is right on a wide screen and produces unusable slivers on a phone.
 * Over three quarters of traffic in this vertical is mobile, so these rules
 * collapse every multi-column grid and scale the type down.
 *
 * Kept in one place rather than repeated per renderer: five files each with
 * their own breakpoints would drift immediately.
 */
export default function SereneResponsive() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* Any grid with an explicit column ratio stacks on a phone */
      @media (max-width: 860px) {
        [style*="grid-template-columns"][style*="fr) minmax"] {
          grid-template-columns: 1fr !important;
        }
        [style*="grid-template-columns: minmax"] {
          grid-template-columns: 1fr !important;
        }

        /* Bento tiles that span two columns become single width */
        [style*="grid-column: span 2"],
        [style*="grid-row: span 2"] {
          grid-column: span 1 !important;
          grid-row: span 1 !important;
          min-height: 260px !important;
        }

        /* Hero images sit above content rather than beside it */
        [style*="justify-self: end"],
        [style*="justifySelf: end"] {
          justify-self: stretch !important;
          max-width: 100% !important;
        }

        /* Sticky columns have nothing to stick against once stacked */
        [style*="position: sticky"] {
          position: static !important;
        }

        /* Left borders on stacked columns read as stray lines */
        [style*="border-left: 1px solid"] {
          border-left: none !important;
          border-top: 1px solid rgba(244,239,232,0.12) !important;
          padding-left: 0 !important;
          padding-top: 24px !important;
          margin-top: 24px !important;
        }

        /* Right-aligned footer text wraps badly at narrow widths */
        [style*="text-align: right"] {
          text-align: left !important;
        }
      }

      /* Tighter padding on small screens: the desktop scale eats the viewport */
      @media (max-width: 560px) {
        section {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        h1 { letter-spacing: -0.01em !important; }
      }

      /* Touch targets. Anything tappable needs real height. */
      @media (hover: none) {
        a[style*="border-radius: 9999px"] {
          min-height: 48px !important;
          display: inline-flex !important;
          align-items: center !important;
        }
      }
    ` }} />
  )
}
