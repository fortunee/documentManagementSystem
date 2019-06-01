import db from '../models';

/**
 * controllers helper functions
 */
const Helpers = {
  /**
   * isAdmin - This returns all documents
   *
   * @param  {object} req
   * @param  {object} res
   * @returns {object}
   */
  async isAdmin(req, res) {
    const queryOptions = {
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
    }
    const documents = await db.Document.findAll(queryOptions);
    
    res.send(documents);
  },

  /**
   * isNotAdmin - This returns the documents that match the criteria
   *
   * @param  {object} req
   * @param  {object} res
   * @returns {object} Filtered documents
   */
  async isNotAdmin(req, res) {
    const queryOptions = {
      offset: req.query.start || null,
      limit: req.query.limit,
      access: req.query.access || null,
      type: req.query.type || null,
      order: '"createdAt" DESC',
      where: db.Sequelize.or(
        { OwnerId: req.decoded.UserId },
        { access: { $notIn: ['private'] } },
      ),
      include: [
        { 
          as: 'Owner',
          model: db.User,
          attributes: [ 'RoleId' ]
        }
      ]
    }
    
    const documents = await db.Document.findAll(queryOptions);
    
    res.status(200).send(
      documents.filter(
          document => document.access === 'role' && 
          document.Owner.RoleId === req.decoded.RoleId
      )
    );
  }
};

export default Helpers;
