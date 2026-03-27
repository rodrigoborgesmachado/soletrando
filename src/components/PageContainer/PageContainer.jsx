import './PageContainer.css';

function PageContainer({ children }) {
  return <section className="page-container fade-up">{children}</section>;
}

export default PageContainer;
