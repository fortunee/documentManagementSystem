const docRoute = (router) => {
  /**
   *   Get all documents or create a new document
   */
  router.route('/documents')
    .get((req, res) => {
      res.send({
        message: 'Get all documents'
      });
    })
    .post((req, res) => {
      res.send({
        message: 'Creates a new document instance'
      });
    });


  /**
   * Get, Update and delete a specific document
   */
  router.route('/documents/:id')
    .get((req, res) => {
      res.send({
        message: 'Get a specific document'
      });
    })
    .put((req, res) => {
      res.send({
        message: 'Update a specific document'
      });
    })
    .delete((req, res) => {
      res.send({
        message: 'Delete document'
      });
    });


  /**
   * Get all documents belonging to a specific user.
   */
  router.route('/users/:username/documents')
    .get((req, res) => {
      res.send({
        message: 'Gets all documents for a specific user'
      });
    });
};

export default docRoute;
