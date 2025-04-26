# Indice

1. [Introducción](#introducción)

2. [Dependencias](#dependencias)

3. [Documentación](#documentación)
    1. [Configuración](#configuración)
    2. [Manejo de anotaciones](#manejo-de-anotaciones)

---

## Introducción

El uso de Caffeine como sistema de caché es una estrategia eficaz para mejorar el rendimiento de una aplicación, especialmente cuando se trata de optimizar los tiempos de carga y reducir el consumo de recursos. Caffeine es una biblioteca de caché de alto rendimiento para Java que se integra fácilmente con aplicaciones Spring Boot, y permite almacenar datos de acceso frecuente en memoria para que se puedan recuperar rápidamente sin necesidad de realizar una consulta costosa a la base de datos.

### ¿Por qué usar Caffeine?
###### 1. Reducción de los tiempos de carga:

- Caffeine almacena en caché los resultados de operaciones costosas, como consultas a bases de datos, llamados a servicios externos, o cálculos que se realizan repetidamente. Al tener estos resultados almacenados en memoria, se pueden recuperar en milisegundos, evitando la necesidad de repetir las mismas operaciones cada vez.

- De esta manera, las solicitudes a la API pueden ser respondidas mucho más rápido, mejorando la experiencia del usuario final.

###### 2. Reducción del consumo de recursos:

- Las consultas frecuentes a la base de datos o a servicios externos pueden generar una carga significativa en el sistema, afectando la eficiencia de la aplicación y los tiempos de respuesta. Al utilizar Caffeine como caché, reducimos la cantidad de consultas innecesarias, lo que disminuye la carga sobre los recursos del sistema (como la base de datos o servicios externos).
   
- Al almacenar temporalmente los datos en memoria (RAM), Caffeine optimiza el uso de los recursos del servidor, evitando que el sistema se sobrecargue con procesos repetitivos.

###### 3. Caché con políticas inteligentes:

- Caffeine permite configuraciones avanzadas de caché como expiración de entradas y políticas de eliminación (como LRU - Least Recently Used, LFU - Least Frequently Used), lo que garantiza que los datos en caché estén siempre actualizados y que los elementos menos utilizados sean eliminados automáticamente para dar espacio a datos más relevantes.

- Esto mejora la eficiencia de la memoria y asegura que el caché siempre contenga los datos más pertinentes sin necesidad de intervención manual.

###### 4. Escalabilidad:

- Caffeine no solo mejora el rendimiento de una instancia única de la aplicación, sino que también se puede integrar en arquitecturas de microservicios o aplicaciones distribuidas. Esto permite que el caché se mantenga consistente y rápido incluso a medida que la aplicación escala, manejando grandes volúmenes de solicitudes concurrentes sin afectar la experiencia del usuario.

###### 5. Integración sencilla con Spring Boot:

- Spring Boot ofrece soporte integrado para Caffeine, lo que facilita su configuración y uso. A través de simples anotaciones como @Cacheable, @CacheEvict, y @CachePut, se puede implementar caché en métodos específicos de la aplicación, mejorando su rendimiento sin necesidad de escribir código complejo.

- Además, Caffeine tiene una excelente documentación y una comunidad activa, lo que facilita su integración en proyectos de cualquier tamaño.

###### Beneficios adicionales de usar Caffeine

- Alta eficiencia: Gracias a su diseño optimizado, Caffeine es mucho más rápido que otras soluciones de caché tradicionales como Guava o Ehcache en términos de latencia y throughput, lo que lo convierte en una opción ideal para aplicaciones que requieren un acceso rápido a los datos en memoria.

- Manejo eficiente de la memoria: Caffeine implementa un sistema de almacenamiento en caché que se ajusta dinámicamente según la cantidad de memoria disponible. Esto significa que usa la memoria de manera más eficiente, maximizando el rendimiento de la aplicación sin consumir recursos innecesarios.

- Soporte para caché asincrónico: Caffeine también soporta operaciones asincrónicas, lo que permite que las aplicaciones manejen de forma más eficiente tareas de caché de larga duración o consultas a servicios externos sin bloquear el hilo principal de ejecución.

## Dependencias

En éste proyecto utilizamos Maven por lo tanto agregamos las dependencias en el pom.xml

```java
    <dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-cache</artifactId> <!-- Spring Cache -->
		</dependency>
		<dependency>
			<groupId>com.github.ben-manes.caffeine</groupId> <!-- Caffeine -->
			<artifactId>caffeine</artifactId>
		</dependency>
	</dependencies>
```

Usamos Spring Cache en conjunto de Caffeine

## Documentación

#### Configuración

Luego de tener integradas ambas dependencias en el **pom.xml** creamos la clase **CacheConfig** en la **capa de configuración** (Es muy importante que **CacheConfig** lleve la anotación `@Configuration` y la anotación `@EnableCaching`) que es en donde vamos a crear nuestro `@Bean` llamado CacheManager que va a ser el encargado de llevar el control de todas las anotaciones de Cache `@Caching` `@Cacheable` `@CachePut` `@CacheEvict`

El **CacheManager** recibe como parametro un HashMap generico de Caffeine en donde va a ser luego de haber creado una instancia de **CaffeineCacheManager** a esa instancia le vamos a settear el Caffeine recibido por parametro y retornamos la instancia de **CaffeineCacheManager**`

```java
    @Bean
    CacheManager cacheManager(Caffeine<Object, Object> caffeine) {
        CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager();
        caffeineCacheManager.setCaffeine(caffeine);
        return caffeineCacheManager;
    }
```

Por otra parte podemos desacoplar del application.properties la configuración de Caffeine, como el TTL (Time-To-Live), la cantidad inicial de elementos, la cantidad máxima de elementos.

```java
    @Value("${cache.expiration.time:600}")
    private long EXPIRATION_TIME;

    @Value("${cache.max.elements:100}")
    private long MAX_ELEMENTS;

    @Bean
    Caffeine<Object, Object> caffeineConfig() {
        return Caffeine.newBuilder()
                .expireAfterWrite(EXPIRATION_TIME, TimeUnit.SECONDS) // Cantidad de segundos que deben pasar para eliminar el cache
                .initialCapacity(10) // capacidad inicial de elementos
                .maximumSize(MAX_ELEMENTS); // cantidad máxima de elementos
    }
```

Tenemos dos variables que son inyectadas desde el application.properties pero a su vez van a ser manejadas por variables de entorno.

- expireAfterWrite: Nos sirve para manejar el Time-To-Live, esto quiere decir que superado ese tiempo el Caché va a ser eliminado automáticamente. También se puede usar MINUTES en el TimeUnit
  <br>
- initialCapacity: La capacidad que va a preparar inicialmente de elementos
  <br>
- maximumSize: La capacidad máxima de elementos, superado esa cantidad se elimina el cache

## Manejo de anotaciones

Tenemos la anotación `@EnableCaching` esto hace que Spring interprete que el Cache ya esta habilitado.

Después de eso tenemos las anotaciones para el manejo del Cache

Tenemos el `@Caching` que es el creador de nuestro elemento de cache lo usamos de la forma `@Caching(value = "identificador de cache", key = "parametro que se toma como referencia")` hay que tener en cuenta que usamos SpEl, Spring Expression Language para usar dentro de los valores de key y el value solo es el nombre del elemento, puede ser el que queramos que sea entendible de lo que se va a guardar, es como si fuera una tabla de base de datos.

Acá vamos con un ejemplo del uso de `@Caching` solo con value

Acá vamos con ejemplos que no tienen el mismo contexto del proyecto actual.

En este caso como no tenemos parámetros solamente le asignamos un value que va a hacer referencia a los próximos llamados de ese endpoint
```java
    // METODO GET (Devuelve todos los elementos de la base de datos)
    @Cacheable("products") // El nombre de este Cache se llama products
    public List<Products> getAll(){
        return productRepository.findAll();
    }
```


Ahora cuando recibimos parametros usamos SpEL para sociar el id de parametro a la key, debemos usar el value y la key, en este caso almacenamos lo que se recibió de ese id
```java
    // METODO GET (Solo devuelve el producto por id)
    @Cacheable(value = "product", key = "#id") // El nombre de este Cache se llama product y no es el mismo que el anterior
    public List<Products> getById(Long id){
        return productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }
```

En este caso usamos `@Caching` para anidar varios `@CacheEvict` ya que al crear el producto no devolvemos ningún listado entonces limpiamos el cache de `product` y `products` 
```java
    // METODO POST: Agregar un Producto
    @Caching(evict = {
        @CacheEvict(value = "product", allEntries = true),
        @CacheEvict(value = "products", allEntries = true)
    })   //vaciamos el cache de product y de products
    public Products createProduct(Products product) {
        return productRepository.save(product);
    }
```

Acá usamos tanto el `@CachePut` como el `@CacheEvict` para entradas individuales por id actualizamos el cache de `product` y limpiamos todo el caché de products usando el `@CacheEvict`
```java
    // METODO PUT: Actualizar un producto por Id
    @CachePut(value = "product", key = "#id")                // actualiza el caché del producto con el id de parametros
    @CacheEvict(value = "products", allEntries = true)       // borramos todo el caché de productos
    public Products updateProduct(Long id, Products product) {
    // Recuperamos el producto existente de la base de datos para asegurarnos de que el id coincida
    Products existingProduct = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    modelMapper.map(product, existingProduct); //Usamos ModelMapper para convertir el product de parametro por el existing product
    return productRepository.save(existingProduct);
    }
```

Y finalmente cuando eliminamos elementos usamos el `@CacheEvict`
```java
    // METODO DELETE: Eliminar un producto por ID
    @CacheEvict(value = "product", key = "#id")
    @CacheEvict(value = "products", allEntries = true)
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
```

Y de ésta manera mejoramos el rendimiento de nuestra API
