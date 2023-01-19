const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    // include: used to include the Product model data in the response from the Tag model
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  // dbTagData is the response from the Tag model
    .then((dbTagData) => res.json(dbTagData))
    // if an error occurs, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    // include: used to include the Product model data in the response from the Tag model
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  // dbTagData is the response from the Tag model
    .then((dbTagData) => {
      if (!dbTagData) {
        // if no tag is found, return a 404 error
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // if a tag is found, return the tag data
      res.json(dbTagData);

    } 
    )
    // if an error occurs, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );



});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  // dbTagData is the response from the Tag model
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    }
    )
    // if an error occurs, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  // dbTagData is the response from the Tag model
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    }
    )
    // if an error occurs, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

module.exports = router;
