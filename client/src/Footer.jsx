import './footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <a
        href="https://github.com/GoncaloJoseMoura/blog"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center',
        }}
      >
        <p>Developed By GoncaloJoseMoura</p>
        <img src="github.png" alt="" />
      </a>
    </div>

  );
}
