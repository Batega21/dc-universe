# Next flow

nest cli
nest new
  project-name
  choose package manager
npm run start

Development Mode:
  npm run start:dev

New Controller
  nest generate controller
  HeroesController class ('heroes')
    new endpoint `findAll()`
    - Route params
      @Get(':id')
      `findOne(@Param() params) {`, or
      `findOne(@Param('id') id: string)`
    - Request body / Payload
      `create(@Body() body) {}`

Response Status Code
  `@HttpCode(HttpStatus.CREATED)` Static
  `Res() response` Use it in a specific response

Handling Update requests
  PUT needs the entire object to replace it
  Patch replace only the property in the context
  `@Patch(':id')`
  `update(@Param('id') id: string, @Body() body) {`

Handling Delete requests
  `@Delete(':id')`
  `remove(@Param('id') id: string) {`

Pagination with Query Params
  `@Get('paginated')`
  `findAllPaginated(@Query() pagination) {`

Services
  Responsible for Data storage, retrieval used by the controller
  nest generate service
    service-name
    Update all methods as Controller

Entity class
  is a standard TypeScript class that represents a database table or collection

DTO Data Transfer Object (Type safety)
  is an object that encapsulate data and send it from one application to other
  `nest generate class heroes/dto/create-hero.dto --no-spec`
  `create(@Body() createHeroDto: CreateHeroDto) {`

Validate input data with DTO
  `npm i class-validator class-transformer`
  `app.useGlobalPipes(new ValidationPipe())`
  Validation in DTO
