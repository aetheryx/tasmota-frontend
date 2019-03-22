if (location.pathname !== '/unauthorized') {
  window.auth = {};

  fetch('/auth')
    .then(r =>
      r.ok
        ? r.json()
        : location.href = '/unauthorized'
    )
    .then(res =>
      window.auth = res
    );
}
