(function () {
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    // Call the original fetch function
    const response = await originalFetch.apply(this, args);

    // Clone the response to avoid consuming the stream
    if (args[0] === '/api/loadboard/search') {
      const clonedResponse = response.clone();

      await clonedResponse
        .json()
        .then(data => {
          // Dispatch a custom event to send the data back
          document.dispatchEvent(
            new CustomEvent('FETCH_INTERCEPTED', {
              detail: {
                url: args[0],
                response: data,
              },
            }),
          );
        })
        .catch(e => {
          console.error(e);
        });
    }

    return response;
  };
})();
