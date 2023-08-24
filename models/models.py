from odoo import api, models, fields

class smart_template_maker(models.Model):
    _name = 'smart.template.maker'
    _description = 'Smart Template Maker'

    name = fields.Char('Name')
    x_coordinate = fields.Char('X coordinate')    
    y_coordinate = fields.Char('Y coordinate')    
    