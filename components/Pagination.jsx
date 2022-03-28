import Link from 'next/link';



function NextPageNavigation(props) {
  return (
    <Link href={props.href}>
      <a aria-label={'Next page.'}>Next Page →</a>
    </Link>
  );
}

function PreviousPageNavigation(props) {
  return (
    <Link href={props.href}>
      <a aria-label={'Previous page.'}>← Previous Page</a>
    </Link>
  );
}


export default function Pagination({ pageInfo, basePath }) {
  const previousPageUrl = `${basePath}/before/${pageInfo?.startCursor}`;
  const nextPageUrl = `${basePath}/after/${pageInfo?.endCursor}`;

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="wrap">
        <ul>
          {pageInfo.hasPreviousPage && (
            <li className="pagination-previous">
              <PreviousPageNavigation href={previousPageUrl} />
            </li>
          )}

          {pageInfo.hasNextPage && (
            <li className="pagination-next">
              <NextPageNavigation href={nextPageUrl} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
