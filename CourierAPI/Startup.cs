using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using CourierAPI.Core.Models;
using CourierAPI.Helpers;
using CourierAPI.Infrastructure.Data;
using CourierAPI.Infrastructure.Repositories;
using CourierAPI.Infrastructure.Services;
using System.Data;
using CourierAPI.Infrastructure.ActionFilters;
using Microsoft.Data.SqlClient;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            HostingEnvironment = environment;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment HostingEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            //Configure Database
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("CourierDB")
                )
            );
            //For Dapper
            services.AddScoped<IDbConnection, SqlConnection>(p =>
                new SqlConnection(Configuration.GetConnectionString("CourierDB")));

            //Configure Identity and Identity Store
            services.AddIdentity<AppUser, IdentityRole>(options => {
                
            })
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<DataContext>();
            // //Configure Identity Options
            // services.Configure<IdentityOptions>(options =>
            // {
            //     //Configure Password
            //     options.Password.RequireDigit = true;
            //     options.Password.RequireLowercase = true;
            //     options.Password.RequireUppercase = true;
            //     options.Password.RequireNonAlphanumeric = false;
            //     options.Password.RequiredLength = 8;
            //     options.Password.RequiredUniqueChars = 0;
            // });
            services.AddMvc();

            services.AddControllers(optinos => {
                optinos.Filters.Add(new HttpResponseExceptionFilter());
            }).AddNewtonsoftJson(
                 options => {options.SerializerSettings.ReferenceLoopHandling =            
                Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                options.AllowInputFormatterExceptionMessages = false;
                 }
                
            ).ConfigureApiBehaviorOptions(options =>{
                options.SuppressConsumesConstraintForFormFileParameters = true;
                options.SuppressMapClientErrors = true;
                // options.SuppressModelStateInvalidFilter = false;
                //options.SuppressUseValidationProblemDetailsForInvalidModelStateResponses = true;

                //For Model Error!
                // if (HostingEnvironment.IsDevelopment())
                // {
                //     options.InvalidModelStateResponseFactory = context =>
                // {
                //      var result = new BadRequestObjectResult(context.ModelState);

                //     // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames
                //     result.ContentTypes.Add(MediaTypeNames.Application.Json);
                //     result.ContentTypes.Add(MediaTypeNames.Application.Xml);

                //     return result;
                // };

                // }
                // options.InvalidModelStateResponseFactory = context =>
                // {
                //      var result = new BadRequestObjectResult(context.ModelState);

                //     // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames
                //     result.ContentTypes.Add(MediaTypeNames.Application.Json);
                //     result.ContentTypes.Add(MediaTypeNames.Application.Xml);

                //     return result;
                // };
            });
            //services.BuildServiceProvider().GetService<DataContext>().Database.Migrate();
            services.AddCors();
            
            // Automapper Configuration
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            // configure DI for application services
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            // services.AddScoped<IMerchantRepository, MerchantRepository>();
            // services.AddScoped<IItemRepository, ItemRepository>();
            // services.AddScoped<IItemAttributeRepository, ItemAttributeRepository>();
            // services.AddScoped<IReceiverRepository, ReceiverRepository>();
            // services.AddScoped<IBookingRepository, BookingRepository>();
            // services.AddScoped<IBookingItemRepository, BookingItemRepository>();
            // services.AddScoped<IDeliveryAddressRepository, DeliveryAddressRepository>();
            // services.AddScoped<IDeliveryManRepository, DeliveryManRepository>();
            // services.AddScoped<IAssignedDelivManRepository, AssignedDelivManRepository>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IStatusService, StatusService>();
            services.AddTransient<IMerchantService, MerchantService>();
            services.AddTransient<IReceiverService, ReceiverService>();
            services.AddTransient<IDeliveryManService, DeliveryManService>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseExceptionHandler("/api/error-local-development");
            }
            else
            {
                app.UseExceptionHandler("/api/error");
            }
            // app.UseStatusCodePages(async context => {
            //     context.HttpContext.Response.ContentType = "application/json";
            //     await context.HttpContext.Response.WriteAsync("vvsfff");
            // });
            //app.UseCors(x => x.WithOrigins("http://binary-geek.com").AllowAnyMethod().AllowAnyHeader());
            //app.UseMiddleware<ErrorHandlingMiddleware>();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            
          
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
