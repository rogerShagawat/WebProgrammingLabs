// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

const router = express.Router();

router
   .route("/")
   .get(async (req, res) => {
      try {
         const authorData = await data.getAuthors();
         return res.json(authorData);
      } catch (error) {
         res.status(500).send(`Error: ${error}`);
      }
   })
   .post(async (req, res) => {
      //code here for POST
   });

router
   .route("/:eventId")
   .get(async (req, res) => {
      //code here for GET
   })
   .delete(async (req, res) => {
      //code here for DELETE
   })
   .put(async (req, res) => {
      //code here for PUT
   });
