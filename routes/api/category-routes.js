const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {
      id: req.params.id,
    },
    // include: used to include the Product model data in the response from the Category model
    // attributes: used to specify which columns to return from the Product model
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  // dbCategoryData is the response from the Category model
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);

    })
    // 500 status code is used to indicate that the server encountered an unexpected condition that prevented it from fulfilling the request
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});


router.post('/', (req, res) => {
  
  // create a new category

  Category.create({
    category_name: req.body.category_name,
  })
  // dbCategoryData is the response from the Category model
    .then((dbCategoryData) => res.json(dbCategoryData))
    // 500 status code is used to indicate that the server encountered an unexpected condition that prevented it from fulfilling the request
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // dbCategoryData is the response from the Category model
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    // 500 status code is used to indicate that the server encountered an unexpected condition that prevented it from fulfilling the request
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  // dbCategoryData is the response from the Category model
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    } 
    )
    // 500 status code is used to indicate that the server encountered an unexpected condition that prevented it from fulfilling the request
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );

});

module.exports = router;
