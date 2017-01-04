import db from '../models';

/**
 * controllers helper functions
 */
const Helpers = {
  /**
   * isAdmin - This returns all documents
   *
   * @param  {Object} req Request Object
   * @param  {Object} res Response Object
   * @returns {Void}     Returns Void
   */
  isAdmin(req, res) {
    db.Document.findAll({
      offset: req.query.start,
      limit: req.query.limit,
      access: req.query.access,
      type: req.query.type,
      order: '"createdAt" DESC',
      include: [
        {
          as: 'Owner',
          model: db.User,
          attributes: [
            'RoleId'
          ]
        }
      ]
    })
      .then((documents) => {
        res.send(documents);
      });
  },

  /**
   * isNotAdmin - This returns the documents that match the criteria
   *
   * @param  {Object} req Request Object
   * @param  {Object} res Response Object
   * @returns {Object}     Filetered documents
   */
  isNotAdmin(req, res) {
    db.Document.findAll({
      offset: req.query.start || null,
      limit: req.query.limit,
      access: req.query.access || null,
      type: req.query.type || null,
      order: '"createdAt" DESC',
      where: db.Sequelize.or(
        { OwnerId: req.decoded.UserId },
        {
          access: {
            $notIn: ['private'],
          },
        },
      ),
      include: [
        {
          as: 'Owner',
          model: db.User,
          attributes: [
            'RoleId'
          ]
        }
      ]
    }).then((documents) => {
      res.status(200).send(
        documents
          .filter((document) => {
            if (document.access === 'role') {
              return document.Owner.RoleId === req.decoded.RoleId;
            }
            return true;
          })
      );
    });
  }
};

export default Helpers;
