import { render, screen } from '@testing-library/react';
import App from './App';
import Navbar from './components/Navbar';

// Test for main heading. The hero splits the name across spans, so match on the
// heading's combined text content rather than a single text node.
test('Renders main heading with Roshan', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Roshan/i);
});

// Test for thank you message
test('Displays thank you message in the footer', () => {
  render(<App />);
  expect(
    screen.getByText(/You could have been anywhere on the internet, yet you're here. Thanks for visiting/i)
  ).toBeInTheDocument();
});

// Test for social links. Contacts renders in both the navbar and the footer,
// so each label legitimately appears more than once.
test('Has social links for GitHub, LinkedIn, Behance and Email', () => {
  render(<App />);
  ['GitHub', 'LinkedIn', 'Behance', 'Email'].forEach((label) => {
    expect(screen.getAllByLabelText(new RegExp(`^${label}$`, 'i')).length).toBeGreaterThan(0);
  });
});

// Test for Resume download link in Navbar
// When unit testing Navbar alone, we need to pass the required props
test('Navbar has Resume download link', () => {
  render(<Navbar
    darkMode={false}
    scrolled={false}
    toggleTheme={() => { }}
    sections={[]} // empty is fine unless you're testing section buttons
    scrollToSection={() => { }}
    soundOn={false}
    setSoundOn={() => { }}
  />);
  const resumeLink = screen.getByRole('link', { name: /Resume/i });
  expect(resumeLink).toHaveAttribute('href', expect.stringContaining('resume.pdf'));
  expect(resumeLink).toHaveAttribute('download');
});
