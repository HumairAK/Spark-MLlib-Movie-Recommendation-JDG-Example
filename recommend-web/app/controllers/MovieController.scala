package controllers

import javax.inject._

import org.apache.spark.mllib.recommendation.Rating
import org.infinispan.client.hotrod.configuration.ConfigurationBuilder
import org.infinispan.client.hotrod.{RemoteCache, RemoteCacheManager}
import org.slf4j.LoggerFactory
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc._
import services.RatingService

import scala.collection.mutable.ListBuffer

/**
  * Create a Rating wrapper when returning json results to allow for providing total items in cache
  * for ui to process.
  */
case class RatingWrapper(ratings: List[Rating], totalPages: Int)

@Singleton
class MovieController @Inject() extends Controller
  with RatingJSONWritable  {
  /**
    * Create an Action to render an HTML page with a welcome message.
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  private val logger = LoggerFactory.getLogger("MovieController")


  // BSON-JSON conversions


  def index = Action {
    Ok(views.html.index())
  }


  def ExportRatings() = Action {
    RatingService.exportRatings()
    Ok("Exporting in progress")
  }

  def DisplayCustomRatings()=Action{
    val list:List[Rating]=RatingService.DisplayCustomRatings()
    Ok(Json.toJson(RatingWrapper(list,list.size) ) )
  }

  def Ratings(id: Long) = Action {
    logger.info(s"request resource with id: $id")
    val cache: RemoteCache[Int, Array[Rating]] = fetchRemoteCache
    val list = ListBuffer.empty[Rating]
    if (cache.size() != 0)
      list.appendAll(cache.get(id.toInt).toList)
    val size = cache.size()
    logger.info(s"Size of cache: $size")
    Ok(Json.toJson(RatingWrapper(list.toList, size)))
  }

  //Create service that will append to this file on
  // user product rating
  // 2 ::22::1
  implicit val ratingReads: Reads[Rating] = (
    (JsPath \ "user").read[Int] and
      (JsPath \ "product").read[Int] and
      (JsPath \ "rating").read[Double]
    ) (Rating.apply _)



  def addRating = Action(BodyParsers.parse.json) { request =>
    val ratingResult = request.body.validate[Rating]
    ratingResult.fold(
      errors => {
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))
      },
      rating => {
        RatingService.save(rating)
         Ok(Json.obj("status" -> "OK", "message" -> ("User '" + rating.user + "' saved.")))
      }
    )
  }



  def fetchRemoteCache: RemoteCache[Int, Array[Rating]] = {

    val builder = new ConfigurationBuilder();
    val JdgIp = sys.env.get("RECOMMEND_SERVICE_SERVICE_HOST").mkString("")
    builder.addServer().host(JdgIp).port(11222);
    val cacheManager = new RemoteCacheManager(builder.build())
    val cache = cacheManager.getCache[Int, Array[Rating]]()
    cache
  }

  def Admin() = Action {
    logger.info("forbidden url")
    Forbidden("error")
  }

  implicit val rds = (
    (__ \ 'user).read[String] and
      (__ \ 'rating).read[String] and
      (__ \ 'product).read[String]
    ) tupled

  def mockDisplayReport = Action(parse.json) { request =>
    request.body.validate[(String, String, String)].map{
      case (user, product, rating) =>
        val mockDataSet = Json.obj(
          "status" ->"OK",
          "columns" -> Json.arr(
            Json.obj("data" -> "id", "title" -> "ID"),
            Json.obj("data" -> "movie", "title" -> "Movie Title"),
            Json.obj("data" -> "year", "title" -> "Release Year")
          ),
          "dataSet" -> Json.arr(
            Json.obj("id" -> "1", "movie" -> "Detachment", "year" -> "2004"),
            Json.obj("id" -> "2", "movie" -> "Alexander", "year" -> "2011"),
            Json.obj("id" -> "3", "movie" -> "Black Hawk Down", "year" -> "2001"),
            Json.obj("id" -> "4", "movie" -> "Bourne Identity, The", "year" -> "2002"),
            Json.obj("id" -> "5", "movie" -> "Cast Away", "year" -> "2000"),
            Json.obj("id" -> "6", "movie" -> "Drive", "year" -> "2011"),
            Json.obj("id" -> "7", "movie" -> "Fargo", "year" -> "1996"),
            Json.obj("id" -> "8", "movie" -> "Full Metal Jacket", "year" -> "1987"),
            Json.obj("id" -> "9", "movie" -> "Gattaca", "year" -> "1997"),
            Json.obj("id" -> "10", "movie" -> "Hitch", "year" -> "2005"),
            Json.obj("id" -> "12", "movie" -> "Matrix", "year" -> "1999"),
            Json.obj("id" -> "13", "movie" -> "Miami Vice", "year" -> "2006"),
            Json.obj("id" -> "14", "movie" -> "Catch Me if You Can", "year" -> "2004"),
            Json.obj("id" -> "15", "movie" -> "Ocean's 11", "year" -> "2001"),
            Json.obj("id" -> "16", "movie" -> "Platoon", "year" -> "2001"),
            Json.obj("id" -> "17", "movie" -> "Romeo + Juliet", "year" -> "1996")
          )
      )
      Ok(mockDataSet)
    }.recoverTotal{
      e => BadRequest("Detected error:"+ JsError.toJson(e))
    }
  }
}
