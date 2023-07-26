# -*- coding: utf-8 -*-
{
    'name': "Smart Template Maker",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",
    'description': """
        Long description of module's purpose
    """,
    'author': "Tasin Tarek",
    'website': "https://www.yourcompany.com",

    'category': 'Uncategorized',
    'version': '0.1',
    'depends': ['base','website','portal','web'],
    # always loaded
    'data': [
        # Security
        'security/ir.model.access.csv',
        # Views
        'views/template_maker_templates.xml',
        'views/template_maker_view.xml',
        # Menus
        'menus/menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
           
            # ('include', 'app_name/static/src/js/web_assets_backend.js'),
        ],
        'web.assets_frontend': [
            'smart_template_maker/static/src/js/custom.js',
            'smart_template_maker/static/src/css/custom.css',
            # ('include', 'app_name/static/src/css/web_assets_frontend.css'),
            # ('include', 'app_name/static/src/js/web_assets_frontend.js'),
        ],
        'web.assets_common': [
            # ('include', 'app_name/static/src/css/web_assets_common.css'),
            # ('include', 'app_name/static/src/js/web_assets_common.js'),
        ],
    },
    # 'qweb': [
    #     'static/src/xml/custom_canvas_template.xml',
    # ],

    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
