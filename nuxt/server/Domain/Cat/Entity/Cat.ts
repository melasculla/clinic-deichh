export default class Cat {
   private id: TCat['id']
   private gender: TCat['gender']
   private name: TCat['name']
   private slug: TCat['slug']
   private color: TCat['color']
   private status: TCat['status']
   private thumbnail: TCat['thumbnail']
   private gallery: TCat['gallery']
   private sire: TCat['sire']
   private dam: TCat['dam']
   private createdAt: TCat['createdAt']

   private children: {
      id: TCat['id']
      name: TCat['name']
      slug: TCat['slug']
      thumbnail: TCat['thumbnail']
   }[] | undefined

   constructor(cat: TCat) {
      this.id = cat.id
      this.gender = cat.gender
      this.name = cat.name
      this.slug = cat.slug
      this.color = cat.color
      this.status = cat.status
      this.thumbnail = cat.thumbnail
      this.gallery = cat.gallery
      this.sire = cat.sire
      this.dam = cat.dam
      this.createdAt = cat.createdAt || new Date()

      // @ts-ignore
      this.children = cat.children
   }

   public getId() {
      return this.id
   }

   public getGender() {
      return this.gender
   }

   public getname() {
      return this.name
   }

   public getSlug() {
      return this.slug
   }

   public getColor() {
      return this.color
   }

   public getThumbnail() {
      return this.thumbnail
   }

   public getGallery() {
      return this.gallery
   }

   public getSire() {
      return this.sire
   }

   public getDam() {
      return this.dam
   }

   public getCreatedAt() {
      return this.createdAt
   }

   // Update

   public updateGender(gender: TCat['gender']) {
      this.gender = gender
      return this
   }

   public updatename(name: TCat['name']) {
      this.name = name
      return this
   }

   public updateSlug(slug: TCat['slug']) {
      this.slug = slug
      return this
   }

   public updateColor(color: TCat['color']) {
      this.color = color
      return this
   }

   public updateStatus(status: TCat['status']) {
      this.status = status
      return this
   }

   public updateThumbnail(thumbnail: TCat['thumbnail']) {
      this.thumbnail = thumbnail
      return this
   }

   public updateGallery(gallery: TCat['gallery']) {
      this.gallery = gallery
      return this
   }

   public updateSire(sire: TCat['sire']) {
      this.sire = sire
      return this
   }

   public updateDam(dam: TCat['dam']) {
      this.dam = dam
      return this
   }

   public updateCreatedAt(createdAt: TCat['createdAt']) {
      this.createdAt = createdAt
      return this
   }

   public toJSON() {
      return {
         id: this.id,
         gender: this.gender,
         name: this.name,
         slug: this.slug,
         color: this.color,
         status: this.status,
         thumbnail: this.thumbnail,
         gallery: this.gallery,
         sire: this.sire,
         dam: this.dam,
         createdAt: this.createdAt,

         children: this.children
      }
   }

   public fromDB(cat: TCat) {
      this.id = cat.id
      this.gender = cat.gender
      this.name = cat.name
      this.slug = cat.slug
      this.color = cat.color
      this.status = cat.status
      this.thumbnail = cat.thumbnail
      this.gallery = cat.gallery
      this.sire = cat.sire
      this.dam = cat.dam
      this.createdAt = cat.createdAt
   }
}